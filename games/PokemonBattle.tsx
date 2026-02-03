
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

const PokemonBattle: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);

  const currentWord = WORDS[currentIdx];

  useEffect(() => {
    const wrong = WORDS.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([currentWord, ...wrong].sort(() => 0.5 - Math.random()));
  }, [currentIdx]);

  const handleAttack = (opt: WordItem) => {
    if (isAttacking) return;
    setIsAttacking(true);
    
    if (opt.id === currentWord.id) {
      // Correct! Player attacks
      setEnemyHp(prev => Math.max(0, prev - 25));
      setTimeout(() => {
        setIsAttacking(false);
        if (enemyHp <= 25) {
          alert("Victory! You defeated the enemy! 🏆🔥");
          onBack();
        } else {
          setCurrentIdx(prev => (prev + 1) % WORDS.length);
        }
      }, 1000);
    } else {
      // Wrong! Enemy attacks
      setPlayerHp(prev => Math.max(0, prev - 20));
      setTimeout(() => {
        setIsAttacking(false);
        if (playerHp <= 20) {
          alert("Oh no! Try again! 💫");
          setPlayerHp(100);
          setEnemyHp(100);
          setCurrentIdx(0);
        } else {
          setCurrentIdx(prev => (prev + 1) % WORDS.length);
        }
      }, 1000);
    }
  };

  const getHpColor = (hp: number) => {
    if (hp > 60) return 'bg-green-500';
    if (hp > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full text-center p-4">
      <button onClick={onBack} className="absolute left-4 top-4 bg-slate-200 p-2 rounded-full px-4 font-bold">⬅️ Back</button>
      
      <div className="flex justify-between items-center mb-12 mt-12 px-8">
        <div className="w-1/3">
           <img src={`${POKEMON_SPRITE_URL}6.png`} className={`w-32 h-32 mx-auto ${isAttacking ? 'animate-bounce' : ''}`} alt="Player Charizard" />
           <div className="mt-2 text-xl font-bold text-slate-700">You (Charizard)</div>
           <div className="w-full bg-slate-200 h-6 rounded-full mt-2 border-2 border-slate-300 overflow-hidden">
             <div className={`h-full transition-all duration-500 ${getHpColor(playerHp)}`} style={{ width: `${playerHp}%` }}></div>
           </div>
        </div>
        <div className="text-4xl font-bold text-red-500 animate-pulse">VS</div>
        <div className="w-1/3">
           <img src={`${POKEMON_SPRITE_URL}150.png`} className="w-32 h-32 mx-auto" alt="Enemy Mewtwo" />
           <div className="mt-2 text-xl font-bold text-slate-700">Mewtwo</div>
           <div className="w-full bg-slate-200 h-6 rounded-full mt-2 border-2 border-slate-300 overflow-hidden">
             <div className={`h-full transition-all duration-500 ${getHpColor(enemyHp)}`} style={{ width: `${enemyHp}%` }}></div>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-slate-100 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">
          Sentence: "{currentWord.sentence.replace('___', '______')}"
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt.id}
              disabled={isAttacking}
              onClick={() => handleAttack(opt)}
              className="bg-slate-700 hover:bg-slate-800 text-white p-6 rounded-2xl text-xl font-bold shadow-lg disabled:opacity-50 transition-all"
            >
              {opt.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonBattle;
