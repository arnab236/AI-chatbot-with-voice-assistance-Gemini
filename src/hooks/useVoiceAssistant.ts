import { useState, useCallback } from 'react';
import { useChat } from './useChat';
import { useSpeechRecognition } from './useSpeechRecognition';
import { generateResponse } from '../utils/ai';
import { speak } from '../utils/speech';

export const useVoiceAssistant = () => {
  const { messages, addMessage } = useChat();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUserInput = useCallback(async (text: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const userMessage = addMessage(text, true);
      const response = await generateResponse(text);
      const assistantMessage = addMessage(response, false);
      speak(response, setIsSpeaking);
      return assistantMessage;
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, isProcessing]);

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleUserInput);

  return {
    messages,
    isListening,
    isSpeaking,
    isProcessing,
    startListening,
    stopListening,
    handleUserInput,
  };
};