import React, { useState } from 'react';
import CropMode from './CropMode';
import RainwaterMode from './RainwaterMode';
import BestCropMode from './BestCropMode';
import WaterResourceMode from './WaterResourceMode';

const MobileChatModes = ({ activeChatMode, handleSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModes = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Toggle Button */}
      <button 
        onClick={toggleModes}
        className="w-full bg-blue-500 text-white py-2 px-4 flex items-center justify-center"
      >
        {isOpen ? 'Close Modes' : 'Open Modes'}
      </button>

      {/* Modes Container */}
      {isOpen && (
        <div className="bg-white p-4 border-t border-gray-200 shadow-lg">
          {activeChatMode === 'crop' && <CropMode onSubmit={handleSendMessage} />}
          {activeChatMode === 'rainwater' && <RainwaterMode onSubmit={handleSendMessage} />}
          {activeChatMode === 'bestCrop' && <BestCropMode onSubmit={handleSendMessage} />}
          {activeChatMode === 'waterResource' && <WaterResourceMode onSubmit={handleSendMessage} />}
        </div>
      )}
    </div>
  );
};

export default MobileChatModes;