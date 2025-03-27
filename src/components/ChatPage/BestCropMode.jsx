import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BestCropMode = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [soilType, setSoilType] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = `Act as an agricultural expert. Recommend the best crops to grow based on:
    - Location: ${location}
    - Temperature: ${temperature}°C
    - Humidity: ${humidity}%
    - Soil Type: ${soilType}
    - Water Availability: ${waterAvailability}
    
    Provide detailed recommendations in markdown format with sections for:
    1. Best crop options
    2. Planting guidelines
    3. Expected yield
    4. Maintenance tips
    5. Potential challenges
    
    Format the response properly with headings, bullet points, and clear organization.`;
    
    onSubmit(prompt, {
      temperature,
      humidity,
      soilType,
      waterAvailability,
      location
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.location')}</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.temperature')} (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.humidity')} (%)</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.soilType')}</label>
        <select
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">{t('chatPage.selectSoil')}</option>
          <option value="clay">{t('chatPage.clay')}</option>
          <option value="sandy">{t('chatPage.sandy')}</option>
          <option value="loamy">{t('chatPage.loamy')}</option>
          <option value="silty">{t('chatPage.silty')}</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.waterAvailability')}</label>
        <select
          value={waterAvailability}
          onChange={(e) => setWaterAvailability(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">{t('chatPage.selectWater')}</option>
          <option value="high">{t('chatPage.high')}</option>
          <option value="medium">{t('chatPage.medium')}</option>
          <option value="low">{t('chatPage.low')}</option>
        </select>
      </div>
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full font-medium"
      >
        {t('chatPage.getRecommendations')}
      </button>
    </form>
  );
};

export default BestCropMode;