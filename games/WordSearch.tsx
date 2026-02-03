import React, { useState, useEffect } from 'react';
import { WORDS, DoodlePikachu, DoodleGengar } from '../types';

const GRID_SIZE = 24; // Increased to fit "lookatthebeautifulview" (22 chars)

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

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const placed: PlacedWord[] = [];

    // Sort words by length descending to place longest words first
    const sortedWords = [...WORDS].sort((a, b) => b.english.length - a.english.length);

    sortedWords.forEach(w => {
      const wordText = w.english.toLowerCase().replace(/\s/g, '');
      let isPlaced = false;
      let attempts = 0;
      
      while (!isPlaced && attempts < 100) {
        const horizontal = Math.random() > 0.5;
        
        // Safety: Ensure range is at least 1
        const maxR = horizontal ? GRID_SIZE : Math.max(1, GRID_SIZE - wordText.length);
        const maxC = horizontal ? Math.max(1, GRID_SIZE - wordText.length) : GRID_SIZE;
        
        const r = Math.floor(Math.random() * maxR);
        const c = Math.floor(Math.random() * maxC);
        
        let overlap = false;
        const cells = [];
        for (let i = 0; i < wordText.length; i++) {
          const targetR = r + (horizontal ? 0 : i);
          const targetC = c + (horizontal ? i : 0);
          
          // Double check bounds
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
            if (newGrid[cell.r]) {
              newGrid[cell.r][cell.c] = wordText[i];
            }
          });
          placed.push({ text: wordText, original: w.english, cells });
          isPlaced = true;
        }
        attempts++;
      }
    });

    // Fill remaining cells
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
        if (grid[currR] && grid[currR][currC] !== undefined) {
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
      
      <div className="flex items-center gap-6 mt-12 mb-10">
        <DoodleGengar size={120} />
        <h2 className="text-5xl text-blue-500 font-bold">Word Search 🔍</h2>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 w-full justify-center px-4 overflow-x-auto">
        <div className="sketch-border p-4 bg-white overflow-auto">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
            {grid.map((row, r) => row.map((char, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-7 h-7 sm:w-8 sm:h-8 text-lg font-bold flex items-center justify-center transition-all ${
                  startCell?.r === r && startCell?.c === c ? 'bg-yellow-200' :
                  isCellFound(r, c) ? 'bg-green-100 text-green-600' : 'hover:bg-slate-50'
                }`}
              >
                {char}
              </button>
            )))}
          </div>
        </div>

        <div className="sketch-border p-8 bg-white w-full xl:w-96 h-fit">
          <h3 className="text-3xl font-bold text-slate-500 mb-6 border-b-2 border-dashed border-slate-200 pb-2">Target Words</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-2">
            {WORDS.map(w => (
              <button
                key={w.id}
                onClick={() => autoFind(w.english)}
                className={`text-lg text-left p-2 rounded-lg transition-all ${foundWords.includes(w.english) ? 'text-green-500 font-bold line-through' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                ✏️ {w.english.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
