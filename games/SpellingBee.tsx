
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

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

    // Check if complete
    const currentStr = newInput.map((char, i) => target[i] === ' ' ? ' ' : char).join('');
    if (currentStr === target) {
      setTimeout(() => {
        if (currentIdx < WORDS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          alert("Spelling Champ! 🐝🏆");
          onBack();
        }
      }, 1000);
    }
  };

  const undoLetter = (slotIdx: number) => {
    if (userInput[slotIdx] === null || target[slotIdx] === ' ') return;
    
    const letterToReturn = userInput[slotIdx];
    const newUsedIndices = [...usedIndices];
    
    // Find the first index in shuffled letters that matches the removed letter and was marked as used
    // This logic is slightly tricky because letters can repeat.
    // We need to find which index in 'shuffled' was used for this 'slotIdx'.
    // Simplest: track slot mapping. Let's simplify and just find the first match in usedIndices.
    const usedPos = newUsedIndices.find(idx => shuffled[idx] === letterToReturn);
    if (usedPos !== undefined) {
        setUsedIndices(newUsedIndices.filter(i => i !== usedPos));
        const newInput = [...userInput];
        newInput[slotIdx] = null;
        setUserInput(newInput);
    }
  };

  return (
    <div className="w-full text-center">
      <button onClick={onBack} className="absolute left-4 top-4 bg-slate-200 p-2 rounded-full px-4 font-bold">⬅️ Back</button>
      
      <div className="mt-8">
        <img src={`${POKEMON_SPRITE_URL}7.png`} className="w-24 h-24 mx-auto pokemon-float" alt="Squirtle" />
        <h2 className="text-4xl text-blue-500 mb-2">Spelling Bee 🐝</h2>
        <p className="text-2xl text-slate-600 font-bold mb-8">{currentWord.chinese} {currentWord.emoji}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {target.split('').map((char, i) => (
            <div
              key={i}
              onClick={() => undoLetter(i)}
              className={`w-12 h-16 border-b-4 flex items-center justify-center text-4xl font-bold transition-all cursor-pointer ${
                char === ' ' ? 'border-transparent w-8' : 
                userInput[i] ? 'border-blue-400 text-blue-600' : 'border-slate-300'
              }`}
            >
              {userInput[i]}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-lg border-2 border-dashed border-blue-200">
          {shuffled.map((letter, i) => (
            <button
              key={i}
              disabled={usedIndices.includes(i)}
              onClick={() => handleLetterClick(letter, i)}
              className={`w-14 h-14 rounded-xl text-2xl font-bold transition-all ${
                usedIndices.includes(i) ? 'bg-slate-100 text-transparent' : 'bg-blue-500 text-white hover:scale-110 shadow-md'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpellingBee;
