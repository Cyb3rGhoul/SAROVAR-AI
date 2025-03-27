import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WaterResourceMode = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [waterSources, setWaterSources] = useState('');
  const [dailyUsage, setDailyUsage] = useState('');
  const [issues, setIssues] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = `Act as a water resource management expert. Analyze water resources for ${location} with these details:
    
    - Current water sources: ${waterSources}
    - Daily water usage: ${dailyUsage} liters
    - Current issues: ${issues}
    
    Provide comprehensive recommendations in markdown format with these sections:
    1. **Water Resource Assessment**
    2. **Conservation Strategies**
    3. **Alternative Sources** (groundwater recharge, rainwater, etc.)
    4. **Usage Optimization**
    5. **Technology Solutions** (filters, pumps, etc.)
    6. **Community Management**
    7. **Government Programs**
    
    Include specific solutions for ${location} and format with clear headings and bullet points.`;
    
    onSubmit(prompt, {
      location,
      waterSources,
      dailyUsage,
      issues
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
        <label className="block mb-2 font-medium">{t('chatPage.waterSources')}</label>
        <textarea
          value={waterSources}
          onChange={(e) => setWaterSources(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows={3}
          placeholder={t('chatPage.sourcesPlaceholder')}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.dailyUsage')} (liters)</label>
        <input
          type="number"
          value={dailyUsage}
          onChange={(e) => setDailyUsage(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">{t('chatPage.currentIssues')}</label>
        <textarea
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows={3}
          placeholder={t('chatPage.issuesPlaceholder')}
        />
      </div>
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full font-medium"
      >
        {t('chatPage.getWaterAnalysis')}
      </button>
    </form>
  );
};

export default WaterResourceMode;