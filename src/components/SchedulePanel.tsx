import { Rating, State, type Card as FsrsCard, type ReviewLog } from 'ts-fsrs';
import { formatDue } from '../lib/formatDue';
import styles from './SchedulePanel.module.css';

type SchedulePanelProps = {
  card: FsrsCard;
  log: ReviewLog;
};

const STATE_LABELS: Record<State, string> = {
  [State.New]: 'uusi',
  [State.Learning]: 'opettelussa',
  [State.Review]: 'kertauksessa',
  [State.Relearning]: 'uudelleenopettelussa',
};

/**
 * Temporary panel that makes the scheduler's reasoning visible.
 *
 * Step 4 is finished only when the schedule is understood, not merely when
 * the library is wired up, so the numbers FSRS works from are on screen.
 * Step 7 replaces this with the real daily queue.
 */
export function SchedulePanel({ card, log }: SchedulePanelProps) {
  return (
    <aside className={styles.panel} aria-live="polite">
      <p className={styles.headline}>
        Arvioit <strong>{log.rating === Rating.Again ? 'en muistanut' : 'muistin'}</strong>.
        Seuraava kertaus <strong>{formatDue(card.due)}</strong>.
      </p>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Tila</dt>
          <dd>{STATE_LABELS[card.state]}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Vakaus</dt>
          <dd>{card.stability.toFixed(2)} pv</dd>
        </div>
        <div className={styles.stat}>
          <dt>Vaikeus</dt>
          <dd>{card.difficulty.toFixed(2)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Toistoja</dt>
          <dd>{card.reps}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Unohduksia</dt>
          <dd>{card.lapses}</dd>
        </div>
      </dl>

      <p className={styles.note}>
        Vakaus on arvio siitä, montako päivää muistijälki kestää. Unohdus ei nollaa sitä vaan
        pudottaa sitä — siinä FSRS eroaa vanhemmista algoritmeista.
      </p>

      <p className={styles.scaffold}>
        Tämä paneeli on väliaikainen. Askel 7 korvaa sen päivän jonolla, ja tila tallentuu vasta
        askeleessa 5 — sivun päivitys nollaa sen.
      </p>
    </aside>
  );
}
