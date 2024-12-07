import { ChatError } from './types';

export class GeminiError extends Error implements ChatError {
  code?: string;
  details?: string;

  constructor(message: string, code?: string, details?: string) {
    super(message);
    this.name = 'GeminiError';
    this.code = code;
    this.details = details;
  }
}

export const handleGeminiError = (error: unknown): string => {
  console.error('Gemini API Error:', error);

  if (error instanceof GeminiError) {
    switch (error.code) {
      case 'AUTHENTICATION_ERROR':
        return 'Failed to authenticate with Gemini API. Please check your API key.';
      case 'PERMISSION_DENIED':
        return 'Access to Gemini API was denied. Please verify your API key permissions.';
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('VITE_GEMINI_API_KEY')) {
      return 'Gemini API key is not configured. Please set up your API key in the .env file.';
    }
  }

  return 'An unexpected error occurred. Please try again later.';
};