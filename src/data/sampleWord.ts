import type { Word } from '../types';

/**
 * Temporary hard-coded word so the card view has something to render before
 * there is a database. Step 6 replaces this with the seeded starter deck.
 *
 * Nothing outside the card view should depend on this module.
 *
 * The entry matches CC-CEDICT: 我 我 [wo3] /I/me/my/
 */
export const sampleWord: Word = {
  id: 'sample-word',
  simplified: '我',
  traditional: '我',
  pinyin: 'wǒ',
  pinyin_numbered: 'wo3',
  tone_pattern: '3',
  tone_pattern_surface: '3',
  definitions: ['I', 'me', 'my'],
  frequency_rank: null,
  hsk_level: 1,
  source: 'CC-CEDICT',
};
