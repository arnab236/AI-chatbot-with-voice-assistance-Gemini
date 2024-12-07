import React from 'react';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';

function App() {
  const {
    messages,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    handleUserInput,
  } = useVoiceAssistant();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Voice Assistant</h1>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
          <MessageList messages={messages} />
          <InputArea
            onSubmit={handleUserInput}
            isListening={isListening}
            isSpeaking={isSpeaking}
            onStartListening={startListening}
            onStopListening={stopListening}
          />
        </div>
      </main>
    </div>
  );
}

export default App;