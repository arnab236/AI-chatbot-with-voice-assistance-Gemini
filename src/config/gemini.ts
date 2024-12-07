import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiError } from '../utils/ai/errors';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new GeminiError(
    'VITE_GEMINI_API_KEY is not set in environment variables',
    'AUTHENTICATION_ERROR'
  );
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getGeminiModel = () => {
  try {
    return genAI.getGenerativeModel({ model: 'gemini-pro' });
  } catch (error) {
    throw new GeminiError(
      'Failed to initialize Gemini model',
      'MODEL_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
};