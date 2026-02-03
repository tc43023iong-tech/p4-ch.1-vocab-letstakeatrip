
import React, { useState } from 'react';
import { GameType, WORDS, GAME_METADATA, POKEMON_SPRITE_URL } from './types';
import EmojiDetective from './games/EmojiDetective';
import MatchingGame from './games/MatchingGame';
import SpellingBee from './games/SpellingBee';
import BubblePop from './games/BubblePop';
import WordSearch from './games/WordSearch';
import MemoryGame from './games/MemoryGame';

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
      default: return <Home onSelectGame={(type) => setActiveGame(type)} />;
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto flex flex-col items-center">
      {renderGame()}
    </div>
  );
};

const Home: React.FC<{ onSelectGame: (type: GameType) => void }> = ({ onSelectGame }) => {
  return (
    <div className="text-center animate-fadeIn w-full">
      <div className="mb-12 mt-4 flex items-center justify-center gap-6">
        <img src={`${POKEMON_SPRITE_URL}25.png`} className="w-28 h-28 pokemon-float" alt="Pikachu" />
        <h1 className="text-6xl font-bold text-yellow-500 drop-shadow-lg">Pokémon English!</h1>
        <img src={`${POKEMON_SPRITE_URL}4.png`} className="w-28 h-28 pokemon-float" alt="Charmander" />
      </div>
      
      <p className="text-3xl text-green-700 font-bold mb-12">Let's have fun and learn words! 🌟</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 max-w-5xl mx-auto">
        {GAME_METADATA.map((game) => (
          <button
            key={game.type}
            onClick={() => onSelectGame(game.type as GameType)}
            className="group bg-white p-10 rounded-[40px] shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 border-b-[12px] border-yellow-200"
          >
            <div className="relative mb-6">
              <img 
                src={`${POKEMON_SPRITE_URL}${game.pokemonId}.png`} 
                className="w-32 h-32 mx-auto" 
                alt={game.name} 
              />
              <span className="absolute -top-4 -right-4 text-4xl bg-white p-2 rounded-full shadow-sm">{game.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 group-hover:text-yellow-600 transition-colors">
              {game.name}
            </h3>
          </button>
        ))}
      </div>
      
      <div className="mt-16 text-slate-400 font-bold tracking-widest text-lg">Grade 3 Vocabulary 🌈</div>
    </div>
  );
};

export default App;
