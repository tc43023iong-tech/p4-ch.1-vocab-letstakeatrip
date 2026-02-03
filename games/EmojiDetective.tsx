
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

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
          alert("Excellent! You found them all! 🎉");
          onBack();
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="w-full text-center">
      <button onClick={onBack} className="absolute left-4 top-4 bg-slate-200 p-2 rounded-full px-4 font-bold">⬅️ Back</button>
      
      <div className="mt-12">
        <img src={`${POKEMON_SPRITE_URL}25.png`} className="w-32 h-32 mx-auto pokemon-float" alt="Pikachu Detective" />
        <h2 className="text-4xl text-yellow-600 mb-2">Emoji Detective 🔍</h2>
        <div className="bg-white p-12 rounded-[50px] shadow-xl inline-block border-4 border-yellow-400 mb-8 relative">
           <div className="text-8xl mb-4">{currentWord.emoji}</div>
           <p className="text-2xl text-slate-500 font-bold">{currentWord.chinese}</p>
           {feedback === 'correct' && <div className="absolute inset-0 flex items-center justify-center text-7xl bg-white/80 rounded-[50px]">✅</div>}
           {feedback === 'wrong' && <div className="absolute inset-0 flex items-center justify-center text-7xl bg-white/80 rounded-[50px]">❌</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className="bg-sky-100 hover:bg-sky-200 p-6 rounded-2xl text-2xl font-bold text-sky-800 border-b-4 border-sky-300 transition-all"
            >
              {opt.english}
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-slate-400 font-bold">Progress: {currentIdx + 1} / {WORDS.length}</div>
      </div>
    </div>
  );
};

export default EmojiDetective;
