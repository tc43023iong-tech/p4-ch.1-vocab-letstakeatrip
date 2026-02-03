import React, { useState } from 'react';
import { GameType, GAME_METADATA, DoodlePikachu, DoodleSquirtle, DoodleDog } from './types';
import EmojiDetective from './games/EmojiDetective';
import MatchingGame from './games/MatchingGame';
import SpellingBee from './games/SpellingBee';
import BubblePop from './games/BubblePop';
import WordSearch from './games/WordSearch';
import MemoryGame from './games/MemoryGame';
import FillBlanks from './games/FillBlanks';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>('HOME');

  const renderGame = () => {
    switch (activeGame) {
      case 'EMOJI_DETECTIVE': return <EmojiDetective onBack={() => setActiveGame('HOME')} />;
      case 'MATCHING': return <MatchingGame onBack={() => setActiveGame('HOME')} />;
      case 'SPELLING_BEE': return <SpellingBee onBack={() => setActiveGame('HOME')} />;
      case 'BUBBLE_POP': return <BubblePop onBack={() => setActiveGame('HOME')} />;
      case 'WORD_SEARCH': return <WordSearch onBack={() => setActiveGame('HOME')} />;
      case 'MEMORY_GAME': return <MemoryGame onBack={() => setActiveGame('HOME')} />;
      case 'FILL_BLANKS': return <FillBlanks onBack={() => setActiveGame('HOME')} />;
      default: return <Home onSelectGame={(type) => setActiveGame(type)} />;
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto flex flex-col items-center relative z-10">
      {renderGame()}
    </div>
  );
};

const Home: React.FC<{ onSelectGame: (type: GameType) => void }> = ({ onSelectGame }) => {
  return (
    <div className="text-center w-full mt-4">
      <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-10 relative">
        {/* Decorative Dogs */}
        <div className="absolute -left-24 top-0 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
          <DoodleDog size={110} color="#fde047" />
        </div>
        <div className="absolute -left-12 -bottom-10 animate-wiggle hidden lg:block">
          <DoodleDog size={70} color="#fb923c" />
        </div>

        <div className="animate-float">
          <DoodlePikachu size={160} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-6xl md:text-7xl font-bold text-blue-500 tracking-tight drop-shadow-sm font-serif">
            p4-ch-1-vocab-Let's take a trip 🖍️⚡
          </h1>
          <p className="text-3xl text-slate-400 font-bold mt-2">
            Fun Learning Adventure 🖍️🎒
          </p>
        </div>
        <div className="animate-float" style={{ animationDelay: '1s' }}>
          <DoodleSquirtle size={140} />
        </div>

        {/* Decorative Dogs Right */}
        <div className="absolute -right-24 top-10 animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
          <DoodleDog size={100} color="#cbd5e1" />
        </div>
        <div className="absolute -right-12 bottom-0 animate-wiggle hidden lg:block" style={{ animationDelay: '1.5s' }}>
          <DoodleDog size={80} color="#fca5a5" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 max-w-6xl mx-auto">
        {GAME_METADATA.map((game) => {
          const Char = game.char;
          return (
            <button
              key={game.type}
              onClick={() => onSelectGame(game.type as GameType)}
              className="sketch-button p-6 flex flex-col items-center"
              style={{ backgroundColor: game.color + '33' }}
            >
              <div className="mb-4">
                <Char size={80} />
              </div>
              <div className="text-6xl mb-4 p-4 bg-white rounded-full sketch-border">
                {game.icon}
              </div>
              <h3 className="text-3xl font-bold text-slate-700">
                {game.name}
              </h3>
            </button>
          );
        })}
      </div>
      
      <div className="mt-20 flex items-center justify-center gap-10 opacity-40">
        <DoodleDog size={60} color="#94a3b8" />
        <div className="text-slate-400 font-bold italic text-2xl uppercase">Become a Word Master</div>
        <DoodleDog size={60} color="#fbbf24" />
      </div>
    </div>
  );
};

export default App;
