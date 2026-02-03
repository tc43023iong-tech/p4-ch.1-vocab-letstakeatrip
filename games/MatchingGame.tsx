
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

const MatchingGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sets, setSets] = useState<{ english: string[], chinese: string[] }[]>([]);
  const [currentSetIdx, setCurrentSetIdx] = useState(0);
  const [selectedEng, setSelectedEng] = useState<string | null>(null);
  const [selectedChi, setSelectedChi] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    const totalSets = [];
    for (let i = 0; i < WORDS.length; i += 5) {
      const group = WORDS.slice(i, i + 5);
      totalSets.push({
        english: [...group.map(w => w.english)].sort(() => 0.5 - Math.random()),
        chinese: [...group.map(w => w.chinese)].sort(() => 0.5 - Math.random())
      });
    }
    setSets(totalSets);
  }, []);

  useEffect(() => {
    if (selectedEng && selectedChi) {
      const word = WORDS.find(w => w.english === selectedEng);
      if (word?.chinese === selectedChi) {
        setMatches(prev => [...prev, selectedEng]);
        setSelectedEng(null);
        setSelectedChi(null);
      } else {
        setTimeout(() => {
          setSelectedEng(null);
          setSelectedChi(null);
        }, 500);
      }
    }
  }, [selectedEng, selectedChi]);

  useEffect(() => {
    if (sets.length > 0 && matches.length === sets[currentSetIdx].english.length) {
      if (currentSetIdx < sets.length - 1) {
        setTimeout(() => {
          setCurrentSetIdx(prev => prev + 1);
          setMatches([]);
        }, 1000);
      } else {
        setTimeout(() => {
          alert("Matching Master! 🏆");
          onBack();
        }, 500);
      }
    }
  }, [matches]);

  if (sets.length === 0) return null;

  const currentSet = sets[currentSetIdx];

  return (
    <div className="w-full text-center">
      <button onClick={onBack} className="absolute left-4 top-4 bg-slate-200 p-2 rounded-full px-4 font-bold">⬅️ Back</button>
      
      <div className="mt-8 flex flex-col items-center">
        <img src={`${POKEMON_SPRITE_URL}4.png`} className="w-24 h-24 pokemon-float" alt="Charmander" />
        <h2 className="text-4xl text-orange-500 mb-6">Match the Pairs 🔗</h2>
        
        <div className="flex gap-12 w-full max-w-2xl justify-center mb-8">
          <div className="flex flex-col gap-4 w-1/2">
            {currentSet.english.map(eng => (
              <button
                key={eng}
                disabled={matches.includes(eng)}
                onClick={() => setSelectedEng(eng)}
                className={`p-4 rounded-xl text-xl font-bold border-2 transition-all ${
                  matches.includes(eng) ? 'bg-green-100 border-green-300 text-green-600 opacity-50' :
                  selectedEng === eng ? 'bg-orange-400 border-orange-600 text-white scale-105' : 'bg-white border-slate-200'
                }`}
              >
                {eng}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            {currentSet.chinese.map(chi => (
              <button
                key={chi}
                disabled={matches.some(eng => WORDS.find(w => w.english === eng)?.chinese === chi)}
                onClick={() => setSelectedChi(chi)}
                className={`p-4 rounded-xl text-xl font-bold border-2 transition-all ${
                  matches.some(eng => WORDS.find(w => w.english === eng)?.chinese === chi) ? 'bg-green-100 border-green-300 text-green-600 opacity-50' :
                  selectedChi === chi ? 'bg-orange-400 border-orange-600 text-white scale-105' : 'bg-white border-slate-200'
                }`}
              >
                {chi}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-slate-400 font-bold">Set {currentSetIdx + 1} of {sets.length}</div>
      </div>
    </div>
  );
};

export default MatchingGame;
