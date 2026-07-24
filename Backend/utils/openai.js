import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("CRITICAL: GEMINI_API_KEY is missing from environment variables!");
}

const ai = new GoogleGenAI({ apiKey });

export const getAIResponse = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // <-- Updated model string here
      contents: userPrompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    throw error;
  }
};