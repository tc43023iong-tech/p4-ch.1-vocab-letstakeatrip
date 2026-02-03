import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, DoodlePikachu } from '../types';

const EmojiDetective: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentWord = WORDS[currentIdx];

  useEffect(() => {
    generateOptions();
  }, [currentIdx]);

  const generateOptions = () => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([currentWord, ...wrong].sort(() => 0.5 - Math.random()));
    setFeedback(null);
  };

  const handleSelect = (word: WordItem) => {
    if (word.id === currentWord.id) {
      setFeedback('correct');
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("Excellent job! 🌟👏");
          onBack();
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="w-full text-center relative max-w-4xl">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-16 flex flex-col items-center">
        <DoodlePikachu size={140} />
        <h2 className="text-6xl text-blue-600 mb-8 mt-4 font-bold">Emoji Detective 🔍</h2>
        
        <div className="sketch-border p-12 mb-12 relative w-full max-w-lg bg-white/50">
           <div className="text-[12rem] leading-none mb-8">{currentWord.emoji}</div>
           <p className="text-5xl text-blue-500 font-bold border-t-2 border-dashed border-slate-300 pt-6">{currentWord.chinese}</p>
           {feedback === 'correct' && <div className="absolute inset-0 flex items-center justify-center text-[10rem] animate-bounce z-10">✅</div>}
           {feedback === 'wrong' && <div className="absolute inset-0 flex items-center justify-center text-[10rem] z-10">❌</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className="sketch-button p-10 text-4xl font-bold text-slate-700 hover:bg-yellow-50"
            >
              {opt.english}
            </button>
          ))}
        </div>
        
        <div className="mt-16 text-slate-400 font-bold text-3xl border-b-2 border-slate-200 inline-block px-10">
          Clue {currentIdx + 1} of {WORDS.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiDetective;
