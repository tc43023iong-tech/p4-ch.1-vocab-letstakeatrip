
export interface WordItem {
  id: number;
  english: string;
  chinese: string;
  emoji: string;
  sentence: string;
}

export type GameType = 
  | 'HOME'
  | 'EMOJI_DETECTIVE'
  | 'MATCHING'
  | 'SPELLING_BEE'
  | 'BUBBLE_POP'
  | 'WORD_SEARCH'
  | 'MEMORY_GAME';

export const POKEMON_SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export const WORDS: WordItem[] = [
  { id: 1, english: "watch the birds", chinese: "看鳥", emoji: "🔭🐦", sentence: "We can ___ in the park." },
  { id: 2, english: "eat seafood", chinese: "吃海鮮", emoji: "🦐🦀", sentence: "I want to ___ for dinner." },
  { id: 3, english: "go on the rides", chinese: "玩機動遊戲", emoji: "🎢✨", sentence: "Let's ___ at the park!" },
  { id: 4, english: "watch a show", chinese: "看表演", emoji: "🎭🎤", sentence: "We are going to ___ tonight." },
  { id: 5, english: "getaway", chinese: "短途旅行", emoji: "🎒🚗", sentence: "I need a weekend ___." },
  { id: 6, english: "penguin", chinese: "企鵝", emoji: "🐧❄️", sentence: "The ___ lives in the cold." },
  { id: 7, english: "middle", chinese: "中間", emoji: "⬅️⏺️➡️", sentence: "Sit in the ___ of the row." },
  { id: 8, english: "explore", chinese: "探索", emoji: "🧭🗺️", sentence: "Let's ___ the forest." },
  { id: 9, english: "try street food", chinese: "嘗試街頭小吃", emoji: "🍡🍢", sentence: "I love to ___ in night markets." },
  { id: 10, english: "visit a theme park", chinese: "參觀主題樂園", emoji: "🏰🎡", sentence: "Children like to ___." },
  { id: 11, english: "look at the beautiful view", chinese: "欣賞美景", emoji: "⛰️🌅", sentence: "Stop and ___ from the hill." },
  { id: 12, english: "go camping", chinese: "去露營", emoji: "⛺🔥", sentence: "We usually ___ in winter." },
];

export const GAME_METADATA = [
  { type: 'EMOJI_DETECTIVE', name: 'Emoji Detective', icon: '🔍', pokemonId: 25 },
  { type: 'MATCHING', name: 'Match Pairs', icon: '🔗', pokemonId: 4 },
  { type: 'SPELLING_BEE', name: 'Spelling Bee', icon: '🐝', pokemonId: 7 },
  { type: 'BUBBLE_POP', name: 'Bubble Pop', icon: '🫧', pokemonId: 131 },
  { type: 'WORD_SEARCH', name: 'Word Search', icon: '🧩', pokemonId: 151 },
  { type: 'MEMORY_GAME', name: 'Memory Game', icon: '🧠', pokemonId: 133 },
];
