
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

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
          alert("You are a sentence pro! ✏️");
          onBack();
        }
      }, 1000);
    } else {
      setFeedback(-1);
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="w-full text-center">
      <button onClick={onBack} className="absolute left-4 top-4 bg-slate-200 p-2 rounded-full px-4 font-bold">⬅️ Back</button>
      
      <div className="mt-8 max-w-2xl mx-auto">
        <img src={`${POKEMON_SPRITE_URL}1.png`} className="w-24 h-24 mx-auto pokemon-float" alt="Bulbasaur" />
        <h2 className="text-4xl text-green-600 mb-6">Fill in Blanks ✏️</h2>
        
        <div className="bg-white p-12 rounded-[40px] shadow-lg mb-8 border-4 border-green-100 min-h-[150px] flex items-center justify-center relative">
          <p className="text-3xl font-bold leading-relaxed text-slate-700">
            {currentWord.sentence.replace('___', '______')}
          </p>
          {feedback === currentWord.id && <div className="absolute top-2 right-2 text-4xl">✅</div>}
          {feedback === -1 && <div className="absolute top-2 right-2 text-4xl">❌</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="bg-green-500 hover:bg-green-600 p-6 rounded-2xl text-2xl font-bold text-white shadow-lg transform active:scale-95 transition-all"
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
