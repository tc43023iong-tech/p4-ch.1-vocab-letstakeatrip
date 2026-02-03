
import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, POKEMON_SPRITE_URL } from '../types';

const MemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [stage, setStage] = useState<'WATCH' | 'CHOOSE'>('WATCH');
  const [timer, setTimer] = useState(10);
  const [memorySet, setMemorySet] = useState<WordItem[]>([]);
  const [missingWord, setMissingWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);

  useEffect(() => {
    startRound();
  }, []);

  const startRound = () => {
    // 1. Pick 8 random words for the memory set
    const shuffledPool = [...WORDS].sort(() => 0.5 - Math.random());
    const set = shuffledPool.slice(0, 8);
    
    // 2. Randomly select one to be the "missing" one
    const missing = set[Math.floor(Math.random() * set.length)];
    
    // 3. Generate 4 options: 1 Correct + 3 Distractors
    // Distractors must NOT be any of the 8 words in the memory set
    const remainingPool = WORDS.filter(w => !set.find(m => m.id === w.id));
    const distractors = remainingPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const finalOptions = [missing, ...distractors].sort(() => 0.5 - Math.random());
    
    setMemorySet(set);
    setMissingWord(missing);
    setOptions(finalOptions);
    setStage('WATCH');
    setTimer(10);
    setFeedback(null);
    setSelectedWordId(null);
  };

  useEffect(() => {
    if (stage === 'WATCH' && timer > 0) {
      const t = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(t);
    } else if (stage === 'WATCH' && timer === 0) {
      setStage('CHOOSE');
    }
  }, [timer, stage]);

  const handleSelect = (word: WordItem) => {
    if (feedback) return; // Prevent multiple clicks
    
    setSelectedWordId(word.id);
    if (word.id === missingWord?.id) {
      setFeedback('correct');
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        startRound();
      }, 2500);
    }
  };

  return (
    <div className="w-full text-center flex flex-col items-center pb-12 relative min-h-screen">
      <button onClick={onBack} className="absolute left-6 top-6 bg-white shadow-md p-3 rounded-full px-6 font-bold z-20 hover:bg-slate-50 transition-colors">⬅️ Back</button>
      
      <div className="mt-12 w-full max-w-5xl px-4">
        <img src={`${POKEMON_SPRITE_URL}133.png`} className="w-28 h-28 mx-auto pokemon-float mb-6" alt="Eevee" />
        <h2 className="text-5xl text-purple-600 mb-4 drop-shadow-sm">Memory Challenge 🧠</h2>
        
        {stage === 'WATCH' ? (
          <div className="animate-fadeIn">
            <div className="text-6xl font-bold text-orange-500 mb-10 animate-pulse bg-white inline-block px-12 py-4 rounded-[40px] shadow-xl border-4 border-orange-100">
              {timer}s left!
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {memorySet.map(w => (
                <div key={w.id} className="bg-white p-8 rounded-[40px] shadow-2xl border-[6px] border-purple-100 flex flex-col items-center transform transition-all hover:scale-105">
                   <div className="text-7xl mb-4">{w.emoji}</div>
                   <div className="text-2xl font-bold text-slate-800 mb-2 capitalize">{w.english}</div>
                   <div className="text-lg text-purple-400 font-bold uppercase tracking-widest">{w.chinese}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <h3 className="text-4xl font-bold text-slate-700 mb-10 bg-purple-50 inline-block px-12 py-5 rounded-[50px] border-4 border-purple-200 shadow-sm">
              One word is gone! Which one was it? 🕵️‍♀️
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 relative">
              {memorySet.map(w => (
                <div key={w.id} className={`bg-white p-8 rounded-[40px] shadow-md border-[6px] flex flex-col items-center transition-all ${w.id === missingWord?.id ? 'border-dashed border-slate-300 opacity-30 bg-slate-50 scale-95' : 'border-purple-100 shadow-2xl'}`}>
                   {w.id === missingWord?.id ? (
                     <div className="text-7xl py-10 text-slate-400 font-serif">?</div>
                   ) : (
                     <>
                        <div className="text-7xl mb-4">{w.emoji}</div>
                        <div className="text-2xl font-bold text-slate-800 mb-2 capitalize">{w.english}</div>
                        <div className="text-lg text-purple-400 font-bold">{w.chinese}</div>
                     </>
                   )}
                </div>
              ))}
            </div>

            <div className="bg-white p-12 rounded-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-[12px] border-purple-500 max-w-4xl mx-auto relative overflow-hidden">
              {/* Result Overlay */}
              {feedback && (
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center animate-bounceIn rounded-[48px] ${feedback === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'} text-white`}>
                  <div className="text-8xl mb-4">{feedback === 'correct' ? '✅' : '❌'}</div>
                  <div className="text-5xl font-bold mb-2">
                    {feedback === 'correct' ? 'Correct!' : 'Try Again!'}
                  </div>
                  {feedback === 'wrong' && missingWord && (
                    <div className="text-2xl font-bold mt-2">
                      It was: <span className="underline uppercase">{missingWord.english}</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-2xl text-slate-500 font-bold mb-8 uppercase tracking-widest">Choose the correct answer:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {options.map(w => (
                  <button
                    key={w.id}
                    disabled={!!feedback}
                    onClick={() => handleSelect(w)}
                    className={`p-8 rounded-[30px] text-3xl font-bold text-white shadow-xl transition-all transform hover:scale-105