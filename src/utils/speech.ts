/**
 * Web Speech API utility for authentic German audio pronunciation.
 * Specially tuned for German language learners with slower speech rates.
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const stopSpeech = (): void => {
  if (synth && synth.speaking) {
    synth.cancel();
  }
};

export const speakGerman = (text: string, rate: number = 0.85, onEnd?: () => void): void => {
  if (!isSpeechSupported() || !synth) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any running audio
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate; // 0.85 is pleasant and deliberate for beginner international learners
  utterance.pitch = 1.0;

  // Try to find a native German voice if available
  const voices = synth.getVoices();
  const germanVoice = voices.find(v => v.lang.startsWith('de') || v.lang === 'de_DE');
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  synth.speak(utterance);
};
