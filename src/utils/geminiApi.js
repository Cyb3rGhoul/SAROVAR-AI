import axios from 'axios'; 

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const generateGeminiResponse = async (prompt, imageBase64 = null) => {
  try {
    const parts = [{ text: prompt }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      });
    }

    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: parts,
        role: "user"
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048
      }
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    return "Sorry, I couldn't process your request. Please try again later.";
  }
};