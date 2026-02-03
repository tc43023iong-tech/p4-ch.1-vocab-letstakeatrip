import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_DOODLES } from '../types';

const BubblePop: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [collected, setCollected] = useState<number[]>([]); // Storing indices of POKEMON_DOODLES
  const [popFeedback, setPopFeedback] = useState<number | null>(null);

  const currentWord = WORDS[currentIdx];

  useEffect(() => {
    generateBubbles();
  }, [currentIdx]);

  const generateBubbles = () => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 5);
    setOptions([currentWord, ...wrong].sort(() => 0.5 - Math.random()));
    setPopFeedback(null);
  };

  const handlePop = (opt: WordItem) => {
    if (popFeedback !== null) return;
    if (opt.id === currentWord.id) {
      setPopFeedback(opt.id);
      // Add a reward index that hasn't been added yet or just cycle
      const nextPokeIndex = collected.length % POKEMON_DOODLES.length;
      setCollected(prev => [...prev, nextPokeIndex]);
      
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("Victory! You collected all the Pokemon! 🫧✨");
          onBack();
        }
      }, 1000);
    } else {
      setPopFeedback(-1);
      setTimeout(() => setPopFeedback(null), 800);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-between text-center bg-blue-50/70 rounded-[80px] p-10 border-8 border-blue-200 shadow-2xl relative overflow-hidden">
      {/* Ocean Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-30 animate-float">🐚</div>
      <div className="absolute top-40 right-20 text-6xl opacity-30 animate-float" style={{animationDelay: '1s'}}>🦪</div>
      <div className="absolute bottom-60 left-20 text-6xl opacity-30 animate-float" style={{animationDelay: '2s'}}>🐠</div>

      <button onClick={onBack} className="absolute left-6 top-6 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="z-10 mt-4">
        <h2 className="text-5xl text-blue-600 mb-6 font-bold drop-shadow-sm">Ocean Bubble Pop 🐚🫧</h2>
        <div className="bg-white/90 p-10 rounded-[40px] shadow-lg border-2 border-blue-100 mb-6 inline-block sketch-border">
            <p className="text-5xl font-bold text-blue-900 leading-tight">"{currentWord.chinese}"</p>
        </div>
      </div>

      {/* 2 Rows, 3 Columns Grid - Fixed positions as requested */}
      <div className="grid grid-cols-3 grid-rows-2 gap-10 mb-10 relative z-10 w-full max-w-4xl mx-auto px-10">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePop(opt)}
            className={`w-40 h-40 rounded-full border-4 flex items-center justify-center p-6 text-2xl font-bold transition-all shadow-inner sketch-button ${
              popFeedback === opt.id && opt.id === currentWord.id ? 'bg-green-400 border-green-600 scale-0' :
              popFeedback === -1 ? 'bg-red-100 border-red-300' : 'bg-white/95 border-blue-200 hover:bg-blue-100 hover:scale-105 active:scale-95 text-blue-800'
            }`}
          >
            {opt.english}
          </button>
        ))}
      </div>

      {/* Reward Shell Section */}
      <div className="w-full max-w-4xl bg-white/70 p-10 rounded-[50px] border-b-[16px] border-blue-400 flex flex-col items-center z-10 shadow-2xl relative sketch-border">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-10 py-3 rounded-full font-bold text-2xl shadow-md border-4 border-white">
          Pokemon Rewards 🐚
        </div>
        <div className="flex flex-wrap justify-center gap-8 min-h-[140px] mt-6 w-full">
          {collected.map((pokeIdx, i) => {
            const PokeComp = POKEMON_DOODLES[pokeIdx];
            return (
              <div key={i} className="bg-white p-4 rounded-full shadow-lg animate-bounce border-4 border-yellow-200">
                 <PokeComp size={80} />
              </div>
            );
          })}
          {collected.length === 0 && <span className="text-blue-300 text-2xl font-bold mt-10 italic">Pop bubbles to rescue Pokemon!</span>}
        </div>
      </div>
    </div>
  );
};

export default BubblePop;
