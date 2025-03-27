import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RainwaterMode = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [annualRainfall, setAnnualRainfall] = useState('');
  const [currentStorage, setCurrentStorage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = `Act as a water conservation expert. Recommend rainwater harvesting solutions for ${location} with these parameters:
    
    - Roof area: ${roofArea} sqm
    - Annual rainfall: ${annualRainfall} mm
    - Current water storage: ${currentStorage}
    
    Provide detailed recommendations in markdown format with these sections:
    1. **Potential Collection Capacity** (calculations based on inputs)
    2. **System Design Recommendations**
    3. **Storage Solutions** (tank types, sizes)
    4. **Filtration Requirements**
    5. **Maintenance Guidelines**
    6. **Cost Estimates**
    7. **Government Schemes/Subsidies** (if available)
    
    Include specific advice for ${location} and format the response clearly with headings and bullet points.`;
    
    onSubmit(prompt, {
      location,
      roofArea,
      annualRainfall,
      currentStorage
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
        <label className="block mb-2 font-medium">{t('chatPage.roofArea')} (sqm)</label>
        <input
          type="number"
          value={roofArea}
          onChange={(e) => setRoofArea(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.annualRainfall')} (mm)</label>
        <input
          type="number"
          value={annualRainfall}
          onChange={(e) => setAnnualRainfall(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.currentWaterStorage')}</label>
        <select
          value={currentStorage}
          onChange={(e) => setCurrentStorage(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">{t('chatPage.selectOption')}</option>
          <option value="none">{t('chatPage.none')}</option>
          <option value="small">{t('chatPage.small')} ({"<"}5000L)</option>
          <option value="medium">{t('chatPage.medium')} (5000-15000L)</option>
          <option value="large">{t('chatPage.large')} ({">"}15000L)</option>
        </select>
      </div>
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full font-medium"
      >
        {t('chatPage.getRainwaterSolutions')}
      </button>
    </form>
  );
};

export default RainwaterMode;