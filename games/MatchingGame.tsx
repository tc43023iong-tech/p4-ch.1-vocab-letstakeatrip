import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, CHARACTER_IMAGES } from '../types';

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
          alert("Nobita says: We did it! You are a genius! 🎓✨");
          onBack();
        }, 500);
      }
    }
  }, [matches]);

  if (sets.length === 0) return null;

  const currentSet = sets[currentSetIdx];

  return (
    <div className="w-full text-center relative">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-12 flex flex-col items-center">
        <img src={CHARACTER_IMAGES.NOBITA} className="w-28 h-36 object-contain animate-float" alt="Nobita" />
        <h2 className="text-5xl text-blue-500 mb-10 mt-4 font-bold">Word Match 🔗</h2>
        
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl justify-center mb-10 px-6">
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-slate-500 mb-4 bg-blue-50 sketch-border py-2 px-6">English</h3>
            {currentSet.english.map(eng => (
              <button
                key={eng}
                disabled={matches.includes(eng)}
                onClick={() => setSelectedEng(eng)}
                className={`p-6 text-3xl font-bold sketch-button transition-all ${
                  matches.includes(eng) ? 'bg-green-100 text-green-700 border-green-300 line-through opacity-50' :
                  selectedEng === eng ? 'bg-yellow-200 border-orange-400 -rotate-2 scale-105' : 'bg-white hover:bg-slate-50'
                }`}
              >
                {eng}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-slate-500 mb-4 bg-green-50 sketch-border py-2 px-6">Chinese</h3>
            {currentSet.chinese.map(chi => (
              <button
                key={chi}
                disabled={matches.some(eng => WORDS.find(w => w.english === eng)?.chinese === chi)}
                onClick={() => setSelectedChi(chi)}
                className={`p-6 text-3xl font-bold sketch-button transition-all ${
                  matches.some(eng => WORDS.find(w => w.english === eng)?.chinese === chi) ? 'bg-green-100 text-green-700 border-green-300 line-through opacity-50' :
                  selectedChi === chi ? 'bg-yellow-200 border-orange-400 rotate-2 scale-105' : 'bg-white hover:bg-slate-50'
                }`}
              >
                {chi}
              </button>
            ))}
          </div>
        </div>
        
        <div className="sketch-border px-10 py-3 bg-white text-slate-400 font-bold text-2xl mb-10">
          Page {currentSetIdx + 1} / {sets.length}
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;