export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface VoiceAssistantState {
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
}