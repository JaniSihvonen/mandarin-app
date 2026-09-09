import { useCallback, useMemo, useState } from 'react';
import { createEmptyCard, fsrs, type Card as FsrsCard, type ReviewLog } from 'ts-fsrs';
import { Card, type CardGrade } from './components/Card';
import { SchedulePanel } from './components/SchedulePanel';
import { sampleWord } from './data/sampleWord';
import styles from './App.module.css';

function App() {
  const scheduler = useMemo(() => fsrs(), []);
  const [card, setCard] = useState<FsrsCard>(createEmptyCard);
  const [lastReview, setLastReview] = useState<ReviewLog | null>(null);

  const handleRate = useCallback(
    (grade: CardGrade) => {
      // `next` returns both the rescheduled card and a log entry. The log
      // carries exactly the fields the `reviews` table wants, so step 7 can
      // persist it without reshaping anything.
      const { card: rescheduled, log } = scheduler.next(card, new Date(), grade);
      setCard(rescheduled);
      setLastReview(log);
    },
    [card, scheduler],
  );

  return (
    <main className={styles.main}>
      <Card word={sampleWord} onRate={handleRate} />
      {lastReview && <SchedulePanel card={card} log={lastReview} />}
    </main>
  );
}

export default App;
