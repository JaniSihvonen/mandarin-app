/*
 * Finnish inflection comes from the browser, so no dependency and no hand
 * written cases: Intl gives "10 minuutin päästä", "huomenna", "3 päivän
 * päästä" correctly on its own.
 */
const relative = new Intl.RelativeTimeFormat('fi', { numeric: 'auto' });

const MINUTE_MS = 60_000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

/**
 * Human-readable time until a card is due again, picking the largest unit
 * that still reads naturally.
 */
export function formatDue(due: Date, now: Date = new Date()): string {
  const minutes = Math.round((due.getTime() - now.getTime()) / MINUTE_MS);
  if (Math.abs(minutes) < MINUTES_PER_HOUR) return relative.format(minutes, 'minute');

  const hours = Math.round(minutes / MINUTES_PER_HOUR);
  if (Math.abs(hours) < HOURS_PER_DAY) return relative.format(hours, 'hour');

  return relative.format(Math.round(hours / HOURS_PER_DAY), 'day');
}
