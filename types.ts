import React from 'react';

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
  | 'MEMORY_GAME'
  | 'FILL_BLANKS';

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

const createDoodle = (content: React.ReactNode, color: string, size: number) => 
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 100 100', className: 'sketchy' }, content);

export const CHARACTER_IMAGES = {
  NOBITA: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  SUNEO: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  MINI_DORA: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Caleb',
};

export const DoodleDora = ({ size = 100 }) => createDoodle([
  React.createElement('circle', { cx: '50', cy: '45', r: '25', fill: '#fbbf24', stroke: '#555', strokeWidth: '3' }),
  React.createElement('path', { d: 'M30 45 Q30 20 50 20 Q70 20 70 45', fill: '#78350f', stroke: '#555', strokeWidth: '2' }),
  React.createElement('circle', { cx: '42', cy: '45', r: '3', fill: '#333' }),
  React.createElement('circle', { cx: '58', cy: '45', r: '3', fill: '#333' }),
  React.createElement('path', { d: 'M45 55 Q50 60 55 55', fill: 'none', stroke: '#555', strokeWidth: '2' }),
  React.createElement('rect', { x: '35', y: '70', width: '30', height: '25', rx: '5', fill: '#ef4444', stroke: '#555', strokeWidth: '3' })
], '#fbbf24', size);

export const DoodlePikachu = ({ size = 100 }) => createDoodle([
  React.createElement('path', { d: 'M30 40 Q30 10 40 20 L45 35', fill: '#fef08a', stroke: '#555', strokeWidth: '3' }),
  React.createElement('path', { d: 'M70 40 Q70 10 60 20 L55 35', fill: '#fef08a', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '50', cy: '60', r: '35', fill: '#fef08a', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '40', cy: '55', r: '4', fill: '#333' }),
  React.createElement('circle', { cx: '60', cy: '55', r: '4', fill: '#333' }),
  React.createElement('circle', { cx: '35', cy: '65', r: '6', fill: '#f87171' }),
  React.createElement('circle', { cx: '65', cy: '65', r: '6', fill: '#f87171' }),
  React.createElement('path', { d: 'M45 70 Q50 75 55 70', fill: 'none', stroke: '#555', strokeWidth: '2' })
], '#fef08a', size);

export const DoodleBulbasaur = ({ size = 100 }) => createDoodle([
  React.createElement('path', { d: 'M30 40 Q50 10 70 40 Q50 50 30 40', fill: '#86efac', stroke: '#555', strokeWidth: '3' }),
  React.createElement('rect', { x: '25', y: '45', width: '50', height: '35', rx: '15', fill: '#99f6e4', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '40', cy: '60', r: '4', fill: '#333' }),
  React.createElement('circle', { cx: '60', cy: '60', r: '4', fill: '#333' }),
  React.createElement('path', { d: 'M45 70 Q50 75 55 70', fill: 'none', stroke: '#555', strokeWidth: '2' })
], '#99f6e4', size);

export const DoodleCharmander = ({ size = 100 }) => createDoodle([
  React.createElement('circle', { cx: '50', cy: '45', r: '25', fill: '#fdba74', stroke: '#555', strokeWidth: '3' }),
  React.createElement('path', { d: 'M35 65 Q50 95 65 65 Z', fill: '#fdba74', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '42', cy: '40', r: '3', fill: '#333' }),
  React.createElement('circle', { cx: '58', cy: '40', r: '3', fill: '#333' }),
  React.createElement('path', { d: 'M80 50 Q95 30 85 20', fill: 'none', stroke: '#f87171', strokeWidth: '5' })
], '#fdba74', size);

export const DoodleSquirtle = ({ size = 100 }) => createDoodle([
  React.createElement('circle', { cx: '50', cy: '40', r: '20', fill: '#bae6fd', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '50', cy: '70', r: '25', fill: '#fde68a', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '45', cy: '35', r: '3', fill: '#333' }),
  React.createElement('circle', { cx: '55', cy: '35', r: '3', fill: '#333' }),
  React.createElement('path', { d: 'M25 70 Q10 80 20 90', fill: 'none', stroke: '#bae6fd', strokeWidth: '4' })
], '#bae6fd', size);

export const DoodleJigglypuff = ({ size = 100 }) => createDoodle([
  React.createElement('circle', { cx: '50', cy: '50', r: '35', fill: '#fbcfe8', stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '40', cy: '45', r: '8', fill: '#60a5fa', stroke: '#555', strokeWidth: '2' }),
  React.createElement('circle', { cx: '60', cy: '45', r: '8', fill: '#60a5fa', stroke: '#555', strokeWidth: '2' }),
  React.createElement('path', { d: 'M45 65 Q50 70 55 65', fill: 'none', stroke: '#555', strokeWidth: '2' })
], '#fbcfe8', size);

export const DoodleGengar = ({ size = 100 }) => createDoodle([
  React.createElement('path', { d: 'M20 30 L35 45 M80 30 L65 45', stroke: '#555', strokeWidth: '4' }),
  React.createElement('circle', { cx: '50', cy: '60', r: '35', fill: '#ddd6fe', stroke: '#555', strokeWidth: '3' }),
  React.createElement('path', { d: 'M35 55 L45 50 M65 55 L55 50', stroke: '#f87171', strokeWidth: '3' }),
  React.createElement('path', { d: 'M35 75 Q50 85 65 75', fill: 'none', stroke: '#555', strokeWidth: '3' })
], '#ddd6fe', size);

export const DoodleDog = ({ size = 100, color = '#fbbf24' }) => createDoodle([
  React.createElement('path', { d: 'M25 35 Q15 20 20 50', fill: color, stroke: '#555', strokeWidth: '3' }),
  React.createElement('path', { d: 'M75 35 Q85 20 80 50', fill: color, stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '50', cy: '55', r: '30', fill: color, stroke: '#555', strokeWidth: '3' }),
  React.createElement('circle', { cx: '42', cy: '50', r: '3', fill: '#333' }),
  React.createElement('circle', { cx: '58', cy: '50', r: '3', fill: '#333' }),
  React.createElement('circle', { cx: '50', cy: '62', r: '4', fill: '#333' }),
  React.createElement('path', { d: 'M45 68 Q50 72 55 68', fill: 'none', stroke: '#555', strokeWidth: '2' })
], color, size);

export const POKEMON_DOODLES = [DoodlePikachu, DoodleBulbasaur, DoodleCharmander, DoodleSquirtle, DoodleJigglypuff, DoodleGengar];

export const GAME_METADATA = [
  { type: 'EMOJI_DETECTIVE', name: 'Emoji Detective', icon: '🔍', color: '#ffadad', char: DoodlePikachu },
  { type: 'MATCHING', name: 'Match Pairs', icon: '🔗', color: '#a0d8f1', char: DoodleSquirtle },
  { type: 'SPELLING_BEE', name: 'Spelling Bee', icon: '🐝', color: '#fff4ad', char: DoodleBulbasaur },
  { type: 'FILL_BLANKS', name: 'Fill Blanks', icon: '✏️', color: '#caffbf', char: DoodleCharmander },
  { type: 'BUBBLE_POP', name: 'Bubble Pop', icon: '🫧', color: '#a0d8f1', char: DoodleJigglypuff },
  { type: 'WORD_SEARCH', name: 'Word Search', icon: '🧩', color: '#ffadad', char: DoodleGengar },
  { type: 'MEMORY_GAME', name: 'Memory Game', icon: '🧠', color: '#caffbf', char: DoodleBulbasaur },
];
