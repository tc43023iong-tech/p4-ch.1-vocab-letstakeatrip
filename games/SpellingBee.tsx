import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, CHARACTER_IMAGES } from '../types';

const SpellingBee: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState<(string | null)[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const currentWord = WORDS[currentIdx];
  const target = currentWord.english.toLowerCase();

  useEffect(() => {
    const letters = target.split('').filter(char => char !== ' ');
    setShuffled(letters.sort(() => 0.5 - Math.random()));
    setUserInput(new Array(target.length).fill(null));
    setUsedIndices([]);
  }, [currentIdx]);

  const handleLetterClick = (letter: string, idx: number) => {
    if (usedIndices.includes(idx)) return;
    const nextSlot = userInput.findIndex((val, i) => val === null && target[i] !== ' ');
    if (nextSlot === -1) return;
    const newInput = [...userInput];
    newInput[nextSlot] = letter;
    setUserInput(newInput);
    setUsedIndices([...usedIndices, idx]);
    const currentStr = newInput.map((char, i) => target[i] === ' ' ? ' ' : char).join('');
    if (currentStr === target) {
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("Suneo says: You are as smart as me! 🐝💎");
          onBack();
        }
      }, 1000);
    }
  };

  const undoLetter = (slotIdx: number) => {
    if (userInput[slotIdx] === null || target[slotIdx] === ' ') return;
    const letterToReturn = userInput[slotIdx];
    const newUsedIndices = [...usedIndices];
    // Find the first occurrence of this letter in shuffled that is in usedIndices
    const usedPos = newUsedIndices.find(idx => shuffled[idx] === letterToReturn);
    if (usedPos !== undefined) {
        setUsedIndices(newUsedIndices.filter(i => i !== usedPos));
        const newInput = [...userInput];
        newInput[slotIdx] = null;
        setUserInput(newInput);
    }
  };

  return (
    <div className="w-full text-center relative max-w-4xl mx-auto">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-12 flex flex-col items-center">
        <img src={CHARACTER_IMAGES.SUNEO} className="w-28 h-32 object-contain animate-float" alt="Suneo" />
        <h2 className="text-5xl text-blue-500 mb-8 mt-4 font-bold">Spelling Bee 🐝</h2>
        
        <div className="sketch-border p-10 mb-12 bg-white/50 w-full max-w-lg">
            <p className="text-4xl text-slate-700 font-bold mb-4">{currentWord.chinese} {currentWord.emoji}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-20 px-4">
          {target.split('').map((char, i) => (
            <div
              key={i}
              onClick={() => undoLetter(i)}
              className={`w-14 h-24 border-b-4 flex items-center justify-center text-6xl font-bold transition-all cursor-pointer ${
                char === ' ' ? 'border-transparent w-8' : 
                userInput[i] ? 'border-blue-400 text-blue-600 animate-sketch' : 'border-slate-300 text-transparent'
              }`}
              style={{ borderBottomStyle: char === ' ' ? 'none' : 'dashed' }}
            >
              {userInput[i]}
            </div>
          ))}
        </div>

        <div className="sketch-border p-12 bg-white/80 w-full max-w-3xl flex flex-wrap justify-center gap-6">
          {shuffled.map((letter, i) => (
            <button
              key={i}
              disabled={usedIndices.includes(i)}
              onClick={() => handleLetterClick(letter, i)}
              className={`w-20 h-20 sketch-button text-4xl font-bold transition-all transform ${
                usedIndices.includes(i) ? 'opacity-10 scale-90' : 'bg-blue-400 text-white hover:bg-blue-500'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <p className="mt-12 text-slate-400 font-bold text-2xl italic">Tap to write, tap dash to fix! 🖊️</p>
      </div>
    </div>
  );
};

export default SpellingBee;