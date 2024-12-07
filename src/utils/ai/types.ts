export interface GeminiConfig {
  maxOutputTokens?: number;
  temperature?: number;
}

export interface ChatError extends Error {
  code?: string;
  details?: string;
}