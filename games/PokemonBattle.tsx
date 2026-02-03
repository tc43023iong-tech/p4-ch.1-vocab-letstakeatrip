import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, DoodleDora, DoodleFriend } from '../types';

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
      setEnemyHp(prev => Math.max(0, prev - 25));
      setTimeout(() => {
        setIsAttacking(false);
        if (enemyHp <= 25) {
          alert("Victory! You are a master! 🏆🌟");
          onBack();
        } else {
          setCurrentIdx(prev => (prev + 1) % WORDS.length);
        }
      }, 1000);
    } else {
      setPlayerHp(prev => Math.max(0, prev - 20));
      setTimeout(() => {
        setIsAttacking(false);
        if (playerHp <= 20) {
          alert("Oh no! Practice more! 🖍️");
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
    if (hp > 60) return '#caffbf'; // Green
    if (hp > 30) return '#fff4ad'; // Yellow
    return '#ffadad'; // Red
  };

  return (
    <div className="w-full text-center relative max-w-4xl">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-12 flex justify-between items-end px-10 mb-16 h-60">
        <div className={`flex flex-col items-center transition-all ${isAttacking ? 'animate-wiggle' : ''}`}>
           <DoodleDora size={150} />
           <div className="mt-4 w-48 sketch-border h-6 overflow-hidden bg-white">
             <div className="h-full transition-all duration-500" style={{ width: `${playerHp}%`, backgroundColor: getHpColor(playerHp) }}></div>
           </div>
           <p className="font-bold text-xl mt-2">Dora (You)</p>
        </div>

        <div className="text-6xl font-bold text-red-400 mb-10 animate-bounce">VS</div>

        <div className="flex flex-col items-center">
           <DoodleFriend color="#555" size={120} />
           <div className="mt-4 w-48 sketch-border h-6 overflow-hidden bg-white">
             <div className="h-full transition-all duration-500" style={{ width: `${enemyHp}%`, backgroundColor: getHpColor(enemyHp) }}></div>
           </div>
           <p className="font-bold text-xl mt-2">Giant Doodle</p>
        </div>
      </div>

      <div className="sketch-border p-12 bg-white/80 w-full mb-10">
        <h3 className="text-4xl font-bold mb-8 text-slate-700">
          "{currentWord.sentence.replace('___', '______')}"
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {options.map(opt => (
            <button
              key={opt.id}
              disabled={isAttacking}
              onClick={() => handleAttack(opt)}
              className="sketch-button p-6 text-3xl font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
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