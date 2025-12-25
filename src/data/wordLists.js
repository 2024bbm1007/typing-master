// Word lists for different difficulty levels

export const EASY_WORDS = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
  'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
  'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy',
  'did', 'let', 'put', 'say', 'she', 'too', 'use', 'dad', 'mom', 'cat',
  'dog', 'run', 'sit', 'red', 'hot', 'sun', 'car', 'eat', 'big', 'top'
];

export const MEDIUM_WORDS = [
  'about', 'after', 'again', 'before', 'every', 'first', 'found', 'great',
  'house', 'know', 'large', 'learn', 'never', 'other', 'place', 'plant',
  'point', 'right', 'small', 'sound', 'spell', 'still', 'study', 'their',
  'there', 'these', 'thing', 'think', 'three', 'water', 'where', 'which',
  'world', 'would', 'write', 'could', 'people', 'number', 'school', 'through',
  'because', 'change', 'different', 'important', 'children', 'example', 'sentence'
];

export const HARD_WORDS = [
  'achievement', 'administration', 'algorithm', 'architecture', 'authentication',
  'availability', 'characteristic', 'communication', 'comprehension', 'configuration',
  'consciousness', 'consequence', 'consideration', 'contemporary', 'contribution',
  'conventional', 'coordination', 'demonstration', 'development', 'distribution',
  'effectiveness', 'encyclopedia', 'environment', 'establishment', 'extraordinary',
  'implementation', 'independence', 'infrastructure', 'instruction', 'intelligence',
  'interpretation', 'investigation', 'maintenance', 'measurement', 'organization',
  'participation', 'performance', 'perspective', 'philosophical', 'photography',
  'possibility', 'preparation', 'presentation', 'professional', 'recommendation',
  'relationship', 'representation', 'responsibility', 'revolutionary', 'understanding'
];

export const PROGRAMMING_WORDS = [
  'function', 'variable', 'constant', 'interface', 'component', 'parameter',
  'argument', 'callback', 'promise', 'async', 'await', 'return', 'import',
  'export', 'default', 'class', 'extends', 'implements', 'constructor',
  'method', 'property', 'attribute', 'object', 'array', 'string', 'number',
  'boolean', 'undefined', 'null', 'true', 'false', 'if', 'else', 'switch',
  'case', 'break', 'continue', 'for', 'while', 'do', 'try', 'catch',
  'finally', 'throw', 'error', 'debug', 'console', 'document', 'window'
];

/**
 * Generate random text from word list
 * @param {Array} wordList - Array of words to choose from
 * @param {number} wordCount - Number of words to generate
 * @returns {string} Generated text
 */
export const generateRandomText = (wordList, wordCount = 25) => {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  return words.join(' ');
};

/**
 * Mix words from multiple difficulty levels
 * @param {number} easyCount - Number of easy words
 * @param {number} mediumCount - Number of medium words
 * @param {number} hardCount - Number of hard words
 * @returns {string} Mixed difficulty text
 */
export const generateMixedText = (easyCount = 10, mediumCount = 10, hardCount = 5) => {
  const words = [
    ...generateRandomText(EASY_WORDS, easyCount).split(' '),
    ...generateRandomText(MEDIUM_WORDS, mediumCount).split(' '),
    ...generateRandomText(HARD_WORDS, hardCount).split(' ')
  ];
  
  // Shuffle the words
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  
  return words.join(' ');
};
