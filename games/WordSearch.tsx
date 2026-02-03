
import React, { useState, useEffect } from 'react';
import { WORDS, POKEMON_SPRITE_URL } from '../types';

// Smaller grid size for much less density
const GRID_SIZE = 15;

interface PlacedWord {
  text: string;
  original: string;
  cells: { r: number, c: number }[];
}

const WordSearch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [startCell, setStartCell] = useState<{r: number, c: number} | null>(null);
  const [endCell, setEndCell] = useState<{r: number, c: number} | null>(null);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const placed: PlacedWord[] = [];
    
    const sortedWords = [...WORDS].sort((a, b) => b.english.length - a.english.length);

    sortedWords.forEach(w => {
      const wordText = w.english.toLowerCase().replace(/\s/g, '');
      let isPlaced = false;
      let attempts = 0;

      if (wordText.length > GRID_SIZE) return;

      while (!isPlaced && attempts < 500) {
        const horizontal = Math.random() > 0.5;
        const maxR = horizontal ? GRID_SIZE : GRID_SIZE - wordText.length;
        const maxC = horizontal ? GRID_SIZE - wordText.length : GRID_SIZE;
        
        const r = Math.floor(Math.random() * Math.max(1, maxR));
        const c = Math.floor(Math.random() * Math.max(1, maxC));
        
        let overlap = false;
        const cells = [];
        for (let i = 0; i < wordText.length; i++) {
          const targetR = r + (horizontal ? 0 : i);
          const targetC = c + (horizontal ? i : 0);
          const char = newGrid[targetR][targetC];
          if (char !== '' && char !== wordText[i]) {
            overlap = true;
            break;
          }
          cells.push({ r: targetR, c: targetC });
        }

        if (!overlap) {
          for (let i = 0; i < wordText.length; i++) {
            newGrid[cells[i].r][cells[i].c] = wordText[i];
          }
          placed.push({ text: wordText, original: w.english, cells });
          isPlaced = true;
        }
        attempts++;
      }
    });

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
    setGrid(newGrid);
    setPlacedWords(placed);
  };

  const handleCellClick = (r: number, c: number) => {
    if (!startCell) {
      setStartCell({r, c});
    } else if (!endCell) {
      setEndCell({r, c});
      checkMatch(startCell, {r, c});
    } else {
      setStartCell({r, c});
      setEndCell(null);
    }
  };

  const checkMatch = (start: {r: number, c: number}, end: {r: number, c: number}) => {
    let selectedText = '';
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);
    const len = Math.max(absDr, absDc) + 1;
    
    if (dr === 0 || dc === 0 || absDr === absDc) {
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;
      for (let i = 0; i < len; i++) {
        selectedText += grid[start.r + i * stepR][start.c + i * stepC];
      }
    }

    const matchedWord = WORDS.find(w => w.english.toLowerCase().replace(/\s/g, '') === selectedText);
    if (matchedWord && !foundWords.includes(matchedWord.english)) {
      setFoundWords(prev => [...prev, matchedWord.english]);
    }
    
    setTimeout(() => {
      setStartCell(null);
      setEndCell(null);
    }, 400);
  };

  const autoFind = (wordStr: string) => {
    if (foundWords.includes(wordStr)) return;
    setFoundWords(prev => [...prev, wordStr]);
  };

  const isCellFound = (r: number, c: number) => {
    return placedWords.some(pw => foundWords.includes(pw.original) && pw.cells.some(cell => cell.r === r && cell.c === c));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={onBack} className="absolute left-6 top-6 bg-white shadow-md p-3 rounded-full px-6 font-bold z-20 hover:bg-slate-50 transition-colors">⬅️ Back Home</button>
      
      <div className="flex items-center justify-center gap-6 mb-8 mt-12">
        <img src={`${POKEMON_SPRITE_URL}151.png`} className="w-20 h-20 pokemon-float" alt="Mew" />
        <h2 className="text-5xl text-pink-500 drop-shadow-sm">Word Search 🔍</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start w-full justify-center px-6">
        {/* Cleaner Grid Section */}
        <div className="bg-white p-6 rounded-[40px] shadow-2xl border-[12px] border-pink-100 overflow-auto max-w-full">
          <div className="inline-grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[4px]">
            {grid.map((row, r) => row.map((char, c) => {
              const isSelected = (startCell?.r === r && startCell?.c === c) || (endCell?.r === r && endCell?.c === c);
              const found = isCellFound(r, c);
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-xl font-bold flex items-center justify-center rounded-xl transition-all ${
                    isSelected ? 'bg-pink-400 text-white animate-pulse shadow-inner' : 
                    found ? 'bg-green-400 text-white shadow-md' : 'bg-slate-50 hover:bg-pink-100 text-slate-600'
                  }`}
                >
                  {char}
                </button>
              );
            }))}
          </div>
        </div>

        {/* Word List Section */}
        <div className="w-full lg:w-96 bg-white p-10 rounded-[50px] shadow-2xl border-t-[10px] border-pink-400">
          <h3 className="text-3xl font-bold text-pink-600 mb-8 border-b-4 border-pink-50 pb-4">Words to Find</h3>
          <div className="grid grid-cols-1 gap-4 text-left">
            {WORDS.map(w => (
              <button 
                key={w.id} 
                onClick={() => autoFind(w.english)}
                className={`text-xl transition-all flex items-center gap-4 p-4 rounded-2xl hover:bg-pink-50 border-2 border-transparent hover:border-pink-100 ${foundWords.includes(w.english) ? 'text-green-500 font-bold opacity-60' : 'text-slate-600'}`}
              >
                <span className="text-3xl">{foundWords.includes(w.english) ? '✅' : '🌟'}</span>
                <span className={`capitalize ${foundWords.includes(w.english) ? 'line-through' : ''}`}>
                  {w.english}
                </span>
              </button>
            ))}
          </div>
          {foundWords.length === WORDS.length && (
            <div className="mt-12 text-5xl text-green-600 font-bold animate-bounce text-center drop-shadow-md">YOU WON! 🏆</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
