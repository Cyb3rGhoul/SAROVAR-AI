import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-3xl rounded-lg p-4 ${
          message.sender === 'user' 
            ? 'bg-blue-100 text-gray-800 rounded-br-none' 
            : 'bg-green-50 border border-green-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {message.image && (
          <img 
            src={`data:image/jpeg;base64,${message.image}`} 
            alt="Uploaded content"
            className="max-w-xs mb-2 rounded-lg"
          />
        )}
        {message.sender === 'ai' ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;