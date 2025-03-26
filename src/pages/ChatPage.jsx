import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Upload, Settings, X } from 'lucide-react';
import { generateGeminiResponse } from '../utils/geminiApi.js';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateGeminiResponse(input);
      const aiMessage = { text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 
                       language === 'mr' ? 'mr-IN' : 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result.split(',')[1];
        const userMessage = { 
          text: `Analyze this image and response in the language ${language}`,
          sender: 'user',
          image: base64Image 
        };
        setMessages(prev => [...prev, userMessage]);
        
        const response = await generateGeminiResponse("Analyze this image", base64Image);
        const aiMessage = { text: response, sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <div key={index} className={`...`}>
        {msg.image && (
          <img 
            src={`data:image/jpeg;base64,${msg.image}`} 
            alt="Uploaded content"
            className="max-w-xs mb-2 rounded-lg"
          />
        )}
        {msg.text}
      </div>
    ));
  };

  const sidebarItems = [
    { key: 'crop', icon: null },
    { key: 'rainwater', icon: null },
    { key: 'bestCrop', icon: null },
    { key: 'waterResource', icon: null }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="flex w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Side Navbar */}
        <div className="w-64 bg-blue-900 text-white p-6 space-y-2">
          <h2 className="text-xl font-bold mb-6">S.A.R.O.V.A.R</h2>
          <div className="space-y-4">
            {sidebarItems.map((item) => (
              <div 
                key={item.key} 
                className="cursor-pointer hover:bg-blue-700 p-3 rounded-lg transition-all duration-300 ease-in-out flex items-center space-x-3"
              >
                {item.icon}
                <span>{t(`navbar.${item.key}`)}</span>
              </div>
            ))}
          </div>
          <div 
            className="absolute bottom-6 left-6 cursor-pointer hover:rotate-90 transition-transform"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="text-white" size={24} />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col bg-gray-50">
            {renderMessages()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white p-4 border-t border-gray-200 flex items-center space-x-2">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label 
              htmlFor="image-upload" 
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
            >
              <Upload size={24} className="text-gray-600" />
            </label>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chatPage.placeholder')}
              className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />

            <button 
              onClick={startVoiceInput}
              className={`p-2 rounded-full ${
                isListening ? 'bg-red-500' : 'bg-blue-500'
              } text-white transition-all duration-300`}
            >
              <Mic size={24} />
            </button>

            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Language Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl relative w-96">
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2"
            >
              <X size={24} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Select Language</h2>
            <div className="space-y-4">
              {[
                { code: 'en', name: 'English' },
                { code: 'hi', name: 'हिन्दी' },
                { code: 'mr', name: 'मराठी' }
              ].map(({ code, name }) => (
                <button
                  key={code}
                  onClick={() => {
                    changeLanguage(code);
                    setIsSettingsOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg transition-all duration-300 ${
                    language === code 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;