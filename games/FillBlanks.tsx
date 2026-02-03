import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, DoodleDora } from '../types';

const FillBlanks: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [feedback, setFeedback] = useState<number | null>(null);

  const currentWord = WORDS[currentIdx];

  useEffect(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([currentWord, ...wrong].sort(() => 0.5 - Math.random()));
    setFeedback(null);
  }, [currentIdx]);

  const handleSelect = (opt: WordItem) => {
    if (opt.id === currentWord.id) {
      setFeedback(opt.id);
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("Excellent! You are a grammar pro! ✏️🌟");
          onBack();
        }
      }, 1000);
    } else {
      setFeedback(-1);
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="w-full text-center relative max-w-4xl mx-auto">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-12 flex flex-col items-center">
        <DoodleDora size={140} />
        <h2 className="text-5xl text-blue-500 font-bold mt-4 mb-10">Fill the Blanks ✏️</h2>
        
        <div className="sketch-border p-16 bg-white w-full mb-10 min-h-[160px] flex items-center justify-center">
          <p className="text-4xl font-bold leading-relaxed text-slate-700">
            {currentWord.sentence.replace('___', '______')}
          </p>
          {feedback === currentWord.id && <div className="absolute top-4 right-4 text-6xl animate-bounce">✨</div>}
          {feedback === -1 && <div className="absolute top-4 right-4 text-6xl">❌</div>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="sketch-button p-8 text-3xl font-bold text-slate-700 hover:bg-slate-50"
              style={{ borderColor: feedback === opt.id ? '#caffbf' : '#555' }}
            >
              {opt.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FillBlanks;