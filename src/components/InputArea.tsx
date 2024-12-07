import React, { useState, useCallback } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

interface InputAreaProps {
  onSubmit: (text: string) => Promise<void>;
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  onSubmit,
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
}) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(input);
        setInput('');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [input, isSubmitting, onSubmit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={isListening ? onStopListening : onStartListening}
          disabled={isSpeaking || isSubmitting}
          className={`p-3 rounded-full ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? <FaStop /> : <FaMicrophone />}
        </button>
        <button
          type="submit"
          disabled={!input.trim() || isSubmitting}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};