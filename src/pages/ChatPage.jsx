import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Upload, Settings, X, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateGeminiResponse } from '../utils/geminiApi.js';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import CropMode from '../components/ChatPage/CropMode.jsx';
import RainwaterMode from '../components/ChatPage/RainwaterMode.jsx';
import BestCropMode from '../components/ChatPage/BestCropMode.jsx';
import WaterResourceMode from '../components/ChatPage/WaterResourceMode.jsx';
import ChatMessage from '../components/ChatPage/ChatMessage.jsx';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChatMode, setActiveChatMode] = useState('crop');
  const messagesEndRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  // Handle sending messages with proper prompts
  const handleSendMessage = async (prompt, data) => {
    if (!prompt && input.trim() === '') return;

    const userMessage = {
      text: prompt || input,
      sender: 'user',
      mode: activeChatMode,
      data
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Add language instruction to the prompt
      const fullPrompt = `${prompt || input}\n\nPlease respond in ${language} language. 
        Format your response in markdown with proper headings, bullet points and sections.`;

      const response = await generateGeminiResponse(fullPrompt);

      const aiMessage = {
        text: response,
        sender: 'ai',
        mode: activeChatMode,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: t('chatPage.errorResponse'),
        sender: 'ai',
        mode: activeChatMode,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
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
          text: `Analyze this image for ${t(`navbar.${activeChatMode}`)}`,
          sender: 'user',
          image: base64Image,
          mode: activeChatMode
        };
        setMessages(prev => [...prev, userMessage]);

        const response = await generateGeminiResponse(
          `Analyze this image for ${t(`navbar.${activeChatMode}`)}`,
          base64Image
        );
        const aiMessage = {
          text: response,
          sender: 'ai',
          mode: activeChatMode
        };
        setMessages(prev => [...prev, aiMessage]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const renderMessages = () => {
    return messages
      .filter(msg => msg.mode === activeChatMode)
      .map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-3/4 p-4 rounded-lg ${msg.sender === 'user'
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
          >
            {msg.image && (
              <img
                src={`data:image/jpeg;base64,${msg.image}`}
                alt="Uploaded content"
                className="max-w-xs mb-2 rounded-lg"
              />
            )}
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
      ));
  };

  const renderModeComponent = () => {
    switch (activeChatMode) {
      case 'crop':
        return <CropMode onSubmit={handleSendMessage} />;
      case 'rainwater':
        return <RainwaterMode onSubmit={handleSendMessage} />;
      case 'bestCrop':
        return <BestCropMode onSubmit={handleSendMessage} />;
      case 'waterResource':
        return <WaterResourceMode onSubmit={handleSendMessage} />;
      default:
        return null;
    }
  };

  const sidebarItems = [
    { key: 'crop', icon: null, label: 'crop' },
    { key: 'rainwater', icon: null, label: 'rainwater' },
    { key: 'bestCrop', icon: null, label: 'bestCrop' },
    { key: 'waterResource', icon: null, label: 'waterResource' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar and main content */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg transition-all duration-300"
      >
        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed md:relative w-72 h-full bg-blue-800 text-white z-40`}
        >
          <div className="p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-8 font-[Merriweather]"><Link to="/">S.A.R.O.V.A.R</Link></h2>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveChatMode(item.key);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3
                  ${activeChatMode === item.key ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-600'}`}
                >
                  {item.icon}
                  <span>{t(`navbar.${item.label}`)}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700 w-full"
              >
                <Settings size={20} />
                <span>{t('settings.title')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Chat Mode Header */}
          <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              {t(`navbar.${activeChatMode}`)}
            </h2>
          </div>

          <div className="flex-1 flex overflow-hidden bg-white">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6">
              {messages.filter(msg => msg.mode === activeChatMode).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="max-w-md text-center">
                    <h3 className="text-xl font-medium mb-2">
                      {t('chatPage.noMessagesTitle')}
                    </h3>
                    <p>{t('chatPage.noMessagesDescription')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages
                    .filter(msg => msg.mode === activeChatMode)
                    .map((msg, index) => (
                      <ChatMessage key={`${msg.timestamp || index}`} message={msg} />
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form Container */}
            <div className="hidden lg:block w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto p-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                {t('chatPage.enterDetails')}
              </h3>
              {activeChatMode === 'crop' && <CropMode onSubmit={handleSendMessage} />}
              {activeChatMode === 'rainwater' && <RainwaterMode onSubmit={handleSendMessage} />}
              {activeChatMode === 'bestCrop' && <BestCropMode onSubmit={handleSendMessage} />}
              {activeChatMode === 'waterResource' && <WaterResourceMode onSubmit={handleSendMessage} />}
            </div>
          </div>

          {/* Mobile Input Area */}
          {/* Mobile Input Area */}
          <div className="lg:hidden">
            {/* Toggle Button */}
            <button
              onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
              className="w-full bg-blue-500 text-white p-3 flex items-center justify-center"
            >
              {isMobilePanelOpen ? (
                <>
                  <X size={18} className="mr-2" />
                  {t('chatPage.closePanel')}
                </>
              ) : (
                <>
                  <Menu size={18} className="mr-2" />
                  {t('chatPage.openPanel')}
                </>
              )}
            </button>

            {/* Panel Content */}
            {isMobilePanelOpen && (
              <div className="bg-white p-4 border-t border-gray-200">
                {activeChatMode === 'crop' && <CropMode onSubmit={handleSendMessage} />}
                {activeChatMode === 'rainwater' && <RainwaterMode onSubmit={handleSendMessage} />}
                {activeChatMode === 'bestCrop' && <BestCropMode onSubmit={handleSendMessage} />}
                {activeChatMode === 'waterResource' && <WaterResourceMode onSubmit={handleSendMessage} />}
              </div>
            )}
          </div>

          {/* General Input Area */}
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
              className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'
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

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl relative w-96">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2"
            >
              <X size={24} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{t('settings.selectLanguage')}</h2>
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
                  className={`w-full p-3 rounded-lg transition-all duration-300 ${language === code
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