import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CropMode = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [cropQuery, setCropQuery] = useState('');
  const [location, setLocation] = useState('');
  const [plantingSeason, setPlantingSeason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = `Act as an agricultural expert. Provide detailed information about ${cropQuery} crops for ${location}:
    
    - Current planting season: ${plantingSeason}
    
    Include these sections in markdown format:
    1. **Basic Information** (scientific name, family)
    2. **Growing Conditions** (soil, temperature, water needs)
    3. **Planting Guide** (spacing, depth, timing)
    4. **Maintenance** (fertilization, pest control)
    5. **Harvesting** (when and how to harvest)
    6. **Common Challenges**
    7. **Economic Potential**
    
    Provide specific recommendations for ${location} and format the response clearly with headings, bullet points, and organized sections.`;
    
    onSubmit(prompt, {
      cropQuery,
      location,
      plantingSeason
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.cropName')}</label>
        <input
          type="text"
          value={cropQuery}
          onChange={(e) => setCropQuery(e.target.value)}
          placeholder={t('chatPage.cropPlaceholder')}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.location')}</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={t('chatPage.locationPlaceholder')}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.plantingSeason')}</label>
        <select
          value={plantingSeason}
          onChange={(e) => setPlantingSeason(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">{t('chatPage.selectSeason')}</option>
          <option value="spring">{t('chatPage.spring')}</option>
          <option value="summer">{t('chatPage.summer')}</option>
          <option value="monsoon">{t('chatPage.monsoon')}</option>
          <option value="autumn">{t('chatPage.autumn')}</option>
          <option value="winter">{t('chatPage.winter')}</option>
        </select>
      </div>
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full font-medium"
      >
        {t('chatPage.getCropInfo')}
      </button>
    </form>
  );
};

export default CropMode;