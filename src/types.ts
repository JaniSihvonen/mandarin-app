/**
 * Field names deliberately mirror the `words` table in the database
 * (snake_case) instead of following the TypeScript camelCase convention.
 * Supabase returns rows with the column names as they are, so matching them
 * here removes the need for a mapping layer on every read and write.
 *
 * See docs/adr/0009-database-shaped-type-names.md
 */
export interface Word {
  id: string;
  /** Simplified characters, the form v0 shows. */
  simplified: string;
  /** Traditional characters. Stored as data, never displayed in v0. */
  traditional: string;
  /** Pinyin with tone marks: wǒ */
  pinyin: string;
  /** Pinyin with tone numbers, as CC-CEDICT stores it: wo3 */
  pinyin_numbered: string;
  /** Base tones as written, e.g. "3-3" for 你好. Derived in the seed script. */
  tone_pattern: string;
  /**
   * Surface tones after sandhi: 你好 is written 3-3 but spoken 2-3.
   * Fed to the speech synthesiser so pronunciation is not left to the model.
   */
  tone_pattern_surface: string;
  /** Dictionary meanings, most common first. */
  definitions: string[];
  /** Rank in the subtitle frequency list. Null until the seed script fills it. */
  frequency_rank: number | null;
  hsk_level: number | null;
  /** Where the entry came from, for license tracking. */
  source: string;
}
