import { getGeminiModel } from '../../config/gemini';
import { GeminiError, handleGeminiError } from './errors';
import { GeminiConfig } from './types';

let chatInstance: any = null;

const DEFAULT_CONFIG: GeminiConfig = {
  maxOutputTokens: 1000,
  temperature: 0.7,
};

export const initializeChat = (config: GeminiConfig = DEFAULT_CONFIG) => {
  try {
    const model = getGeminiModel();
    chatInstance = model.startChat({
      generationConfig: config,
    });
    return chatInstance;
  } catch (error) {
    throw new GeminiError(
      'Failed to initialize chat',
      'INITIALIZATION_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
};

export const generateResponse = async (input: string): Promise<string> => {
  try {
    if (!input.trim()) {
      return "I didn't receive any input. Could you please try again?";
    }

    if (!chatInstance) {
      initializeChat();
    }

    const result = await chatInstance.sendMessage(input);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new GeminiError('Empty response received from Gemini API', 'EMPTY_RESPONSE');
    }
    
    return text;
  } catch (error) {
    return handleGeminiError(error);
  }
};