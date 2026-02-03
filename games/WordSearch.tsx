import React, { useState, useEffect } from 'react';
import { WORDS, DoodleGengar } from '../types';

const GRID_SIZE = 16; // Smaller grid as requested

interface PlacedWord {
  text: string;
  original: string;
  cells: { r: number, c: number }[];
}

const WordSearch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [targetWords, setTargetWords] = useState<typeof WORDS>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [startCell, setStartCell] = useState<{r: number, c: number} | null>(null);

  useEffect(() => {
    // Select 3 random words for this session
    const subset = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    setTargetWords(subset);
    generateGrid(subset);
  }, []);

  const generateGrid = (wordsToPlace: typeof WORDS) => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const placed: PlacedWord[] = [];

    const sortedWords = [...wordsToPlace].sort((a, b) => b.english.length - a.english.length);

    sortedWords.forEach(w => {
      const wordText = w.english.toLowerCase().replace(/\s/g, '');
      let isPlaced = false;
      let attempts = 0;
      
      while (!isPlaced && attempts < 100) {
        const horizontal = Math.random() > 0.5;
        const maxR = horizontal ? GRID_SIZE : Math.max(1, GRID_SIZE - wordText.length);
        const maxC = horizontal ? Math.max(1, GRID_SIZE - wordText.length) : GRID_SIZE;
        
        const r = Math.floor(Math.random() * maxR);
        const c = Math.floor(Math.random() * maxC);
        
        let overlap = false;
        const cells = [];
        for (let i = 0; i < wordText.length; i++) {
          const targetR = r + (horizontal ? 0 : i);
          const targetC = c + (horizontal ? i : 0);
          
          if (targetR >= GRID_SIZE || targetC >= GRID_SIZE || targetR < 0 || targetC < 0) {
            overlap = true;
            break;
          }

          if (newGrid[targetR][targetC] !== '' && newGrid[targetR][targetC] !== wordText[i]) {
            overlap = true;
            break;
          }
          cells.push({ r: targetR, c: targetC });
        }
        
        if (!overlap) {
          cells.forEach((cell, i) => {
            newGrid[cell.r][cell.c] = wordText[i];
          });
          placed.push({ text: wordText, original: w.english, cells });
          isPlaced = true;
        }
        attempts++;
      }
    });

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
    setGrid(newGrid);
    setPlacedWords(placed);
  };

  const handleCellClick = (r: number, c: number) => {
    if (!startCell) {
      setStartCell({r, c});
    } else {
      checkMatch(startCell, {r, c});
      setStartCell(null);
    }
  };

  const checkMatch = (start: {r: number, c: number}, end: {r: number, c: number}) => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    let selectedText = '';
    
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
      const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
      
      for (let i = 0; i < len; i++) {
        const currR = start.r + i * stepR;
        const currC = start.c + i * stepC;
        if (grid[currR]?.[currC] !== undefined) {
          selectedText += grid[currR][currC];
        }
      }
    }

    const matched = placedWords.find(pw => pw.text === selectedText);
    if (matched && !foundWords.includes(matched.original)) {
      setFoundWords(prev => [...prev, matched.original]);
    }
  };

  const isCellFound = (r: number, c: number) => {
    return placedWords.some(pw => foundWords.includes(pw.original) && pw.cells.some(cell => cell.r === r && cell.c === c));
  };

  const autoFind = (word: string) => {
    if (!foundWords.includes(word)) setFoundWords(prev => [...prev, word]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={onBack} className="absolute left-6 top-6 sketch-button px-6 py-2 font-bold z-20">⬅️ Back</button>
      
      <div className="flex items-center gap-6 mt-12 mb-8">
        <DoodleGengar size={100} />
        <h2 className="text-4xl text-blue-500 font-bold">Word Search 🔍</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full justify-center px-4 max-w-5xl">
        <div className="sketch-border p-3 bg-white shadow-xl">
          <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
            {grid.map((row, r) => row.map((char, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-7 h-7 sm:w-8 sm:h-8 text-base font-bold flex items-center justify-center transition-all ${
                  startCell?.r === r && startCell?.c === c ? 'bg-yellow-200' :
                  isCellFound(r, c) ? 'bg-green-100 text-green-600' : 'hover:bg-slate-50'
                }`}
              >
                {char}
              </button>
            )))}
          </div>
        </div>

        <div className="sketch-border p-6 bg-white w-full md:w-72 h-fit">
          <h3 className="text-2xl font-bold text-slate-500 mb-4 border-b-2 border-dashed border-slate-200 pb-2">Words to Find (3)</h3>
          <div className="flex flex-col gap-3">
            {targetWords.map(w => (
              <button
                key={w.id}
                onClick={() => autoFind(w.english)}
                className={`text-xl text-left p-3 rounded-xl transition-all border-2 border-transparent ${foundWords.includes(w.english) ? 'text-green-500 font-bold line-through bg-green-50' : 'text-slate-600 hover:bg-slate-50 hover:border-blue-100'}`}
              >
                ✏️ {w.english.toLowerCase()}
              </button>
            ))}
          </div>
          {foundWords.length === 3 && (
            <button onClick={() => window.location.reload()} className="mt-8 w-full sketch-button py-3 font-bold text-blue-500">
               Play Again! 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
