import { Card } from './components/Card';
import { sampleWord } from './data/sampleWord';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.main}>
      <Card word={sampleWord} />
    </main>
  );
}

export default App;
