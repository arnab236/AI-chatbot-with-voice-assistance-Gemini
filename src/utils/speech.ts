export const speak = (text: string, setIsSpeaking: (speaking: boolean) => void) => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  
  window.speechSynthesis.speak(utterance);
};