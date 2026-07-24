import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAIResponse = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: userPrompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    throw error;
  }
};