
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

const POKEMON_LIST = [1, 4, 7, 25, 39, 131, 133, 143, 151, 150, 52, 10];

const BubblePop: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [collected, setCollected] = useState<number[]>([]);
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
    if (opt.id === currentWord.id) {
      setPopFeedback(opt.id);
      setCollected(prev => [...prev, POKEMON_LIST[currentIdx % POKEMON_LIST.length]]);
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("All bubbles popped! You rescued the Pokémon! 🫧🐚");
          onBack();
        }
      }, 1000);
    } else {
      setPopFeedback(-1);
      setTimeout(() => setPopFeedback(null), 800);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-between text-center bg-blue-50/50 rounded-[60px] p-8 border-4 border-blue-200 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 text-4xl opacity-50 bubble-animation">🐟</div>
      <div className="absolute bottom-40 right-10 text-4xl opacity-50 bubble-animation">🐙</div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-50 bubble-animation">🐠</div>

      <button onClick={onBack} className="absolute left-4 top-4 bg-white/80 p-2 rounded-full px-4 font-bold z-10">⬅️ Back</button>
      
      <div className="z-10 mt-4">
        <img src={`${POKEMON_SPRITE_URL}131.png`} className="w-24 h-24 mx-auto pokemon-float" alt="Lapras" />
        <h2 className="text-4xl text-blue-600 mb-2">Bubble Pop 🫧</h2>
        <p className="text-5xl font-bold text-blue-900 my-8">"{currentWord.chinese}"</p>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-8 mb-12 relative z-10">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePop(opt)}
            className={`w-32 h-32 rounded-full border-4 flex items-center justify-center p-2 text-xl font-bold transition-all shadow-inner bubble-animation ${
              popFeedback === opt.id && opt.id === currentWord.id ? 'bg-green-400 border-green-600 scale-0' :
              popFeedback === -1 ? 'bg-red-100 border-red-300' : 'bg-white/60 border-blue-200 hover:bg-white/90'
            }`}
          >
            {opt.english}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-orange-100/80 p-4 rounded-3xl border-b-8 border-orange-200 flex flex-wrap justify-center gap-4 min-h-[100px] z-10">
        <span className="w-full text-orange-700 font-bold mb-2">🐚 Rescued Pokémon Shelf 🐚</span>
        {collected.map((pokeId, i) => (
          <img key={i} src={`${POKEMON_SPRITE_URL}${pokeId}.png`} className="w-16 h-16 animate-bounce" alt="Rescue" />
        ))}
        {collected.length === 0 && <span className="text-slate-400">Answer correctly to see Pokémon appear!</span>}
      </div>
    </div>
  );
};

export default BubblePop;
