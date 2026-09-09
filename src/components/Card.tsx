import { useEffect, useState } from 'react';
import { Rating } from 'ts-fsrs';
import type { Word } from '../types';
import styles from './Card.module.css';

/**
 * v0 offers two buttons but stores the grade on the FSRS four-point scale,
 * so adding an "easy" button later does not make the existing history wrong.
 * See v0-Maarittely, chapter 4.
 */
export type CardGrade = Rating.Again | Rating.Good;

type CardProps = {
  word: Word;
  onRate: (grade: CardGrade) => void;
};

/**
 * CC-CEDICT lists anywhere from one to a dozen senses per word. Showing a few
 * reads better than showing one — the primary sense of 我 is "I", which alone
 * renders as a bare stroke that looks like a text cursor — and it also tells
 * the senses apart.
 *
 * The final selection rule is decided in step 6 against the real dictionary,
 * where the spread of definition lengths can actually be measured.
 */
const MEANINGS_SHOWN = 3;

/**
 * A single recognition card.
 *
 * The front shows the characters and nothing else, so that recall is tested
 * rather than reading. The instruction to say the word out loud is on screen
 * on purpose: it is the whole of the pronunciation practice in v0, and
 * without a visible reminder the habit stops within days.
 */
export function Card({ word, onRate }: CardProps) {
  const [revealed, setRevealed] = useState(false);

  function rate(grade: CardGrade) {
    onRate(grade);
    setRevealed(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // `code` is what a physical keyboard reports. `key` is checked as well
      // because input methods and assistive tools synthesise key events that
      // carry only one of the two, and a Chinese IME is likely to be active.
      if (event.code === 'Space' || event.key === ' ') {
        // Suppressed on both sides of the card, not only before the reveal:
        // space scrolls the page by default, and the card must never move
        // under the reader.
        event.preventDefault();
        setRevealed(true);
        return;
      }

      if (!revealed) return;

      const forgot = event.code === 'Digit1' || event.key === '1';
      const remembered = event.code === 'Digit2' || event.key === '2';
      if (!forgot && !remembered) return;

      event.preventDefault();
      rate(forgot ? Rating.Again : Rating.Good);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <article className={styles.card}>
      <p className={styles.hanzi} lang="zh-Hans" data-revealed={revealed}>
        {word.simplified}
      </p>

      {revealed ? (
        <div className={styles.answer} aria-live="polite">
          <p className={styles.pinyin}>{word.pinyin}</p>
          <p className={styles.meaning}>{word.definitions.slice(0, MEANINGS_SHOWN).join(', ')}</p>

          <div className={styles.ratings}>
            <button
              type="button"
              className={styles.rating}
              onClick={() => rate(Rating.Again)}
              data-grade="again"
            >
              <span className={styles.ratingKey}>1</span>
              En muistanut
            </button>
            <button
              type="button"
              className={styles.rating}
              onClick={() => rate(Rating.Good)}
              data-grade="good"
            >
              <span className={styles.ratingKey}>2</span>
              Muistin
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.prompt}>
          <p className={styles.ritual}>Sano ääneen ennen kuin käännät.</p>
          <button type="button" className={styles.reveal} onClick={() => setRevealed(true)}>
            Näytä vastaus
          </button>
        </div>
      )}
    </article>
  );
}
