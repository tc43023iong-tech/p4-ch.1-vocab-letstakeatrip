import React, { useState, useEffect } from 'react';
import { WORDS, WordItem, CHARACTER_IMAGES } from '../types';

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
    const shuffledPool = [...WORDS].sort(() => 0.5 - Math.random());
    const set = shuffledPool.slice(0, 8);
    const missing = set[Math.floor(Math.random() * set.length)];
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
    if (feedback) return;
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
    <div className="w-full flex flex-col items-center relative min-h-[90vh]">
      <button onClick={onBack} className="absolute left-0 top-0 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="mt-12 w-full max-w-6xl px-4 flex flex-col items-center">
        <img src={CHARACTER_IMAGES.MINI_DORA} className="w-28 h-28 object-contain animate-float mb-4" alt="Mini Dora" />
        <h2 className="text-5xl text-red-500 mb-6 font-bold">Memory Sketch Challenge 🧠</h2>
        
        {stage === 'WATCH' ? (
          <div className="w-full flex flex-col items-center">
            <div className="sketch-border px-12 py-4 mb-12 bg-white text-5xl font-bold text-red-600 animate-sketch">
              {timer}s left! 🖍️
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              {memorySet.map(w => (
                <div key={w.id} className="sketch-border p-8 flex flex-col items-center hover:bg-slate-50 transition-colors bg-white">
                   <div className="text-8xl mb-4">{w.emoji}</div>
                   <div className="text-3xl font-bold text-slate-800 mb-2 capitalize">{w.english}</div>
                   <div className="text-xl text-blue-500 font-bold">{w.chinese}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="sketch-border px-10 py-5 bg-white mb-10 w-full max-w-2xl">
              <h3 className="text-3xl font-bold text-slate-700">
                A Mini-Dora drew over one word! Which one? 🕵️‍♂️
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full relative">
              {memorySet.map(w => (
                <div key={w.id} className={`sketch-border p-8 flex flex-col items-center bg-white transition-all ${w.id === missingWord?.id ? 'opacity-20 scale-95 border-dashed border-red-400' : ''}`}>
                   {w.id === missingWord?.id ? (
                     <div className="text-8xl py-10 text-red-400 font-bold">?</div>
                   ) : (
                     <>
                        <div className="text-7xl mb-4">{w.emoji}</div>
                        <div className="text-2xl font-bold text-slate-800 mb-1 capitalize">{w.english}</div>
                        <div className="text-lg text-blue-400 font-bold">{w.chinese}</div>
                     </>
                   )}
                </div>
              ))}
            </div>

            <div className="sketch-border p-12 bg-white w-full max-w-4xl relative">
              {feedback && (
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[30px] ${feedback === 'correct' ? 'bg-green-100/95' : 'bg-red-100/95'} animate-wiggle`}>
                  <div className="text-9xl mb-4">{feedback === 'correct' ? '🌟' : '✏️'}</div>
                  <div className="text-6xl font-bold text-slate-800">
                    {feedback === 'correct' ? 'Super Memory!' : 'Try again!'}
                  </div>
                </div>
              )}

              <p className="text-2xl text-slate-400 font-bold mb-8 uppercase tracking-widest">Choose the missing word:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {options.map(w => (
                  <button
                    key={w.id}
                    disabled={!!feedback}
                    onClick={() => handleSelect(w)}
                    className={`sketch-button p-8 text-4xl font-bold text-slate-700 capitalize ${
                      selectedWordId === w.id 
                        ? (w.id === missingWord?.id ? 'bg-green-200 border-green-600' : 'bg-red-200 border-red-600')
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {w.english}
                    <div className="text-lg text-slate-400 mt-2 font-normal">({w.chinese})</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;