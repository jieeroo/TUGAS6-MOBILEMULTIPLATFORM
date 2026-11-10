import { useMemo } from 'react';

export default function useDiarySearch(entries, query, mood) {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesMood = mood === 'Semua' || entry.mood === mood;
      const searchableText = `${entry.title} ${entry.excerpt} ${entry.mood}`.toLowerCase();
      return matchesMood && searchableText.includes(normalizedQuery);
    });
  }, [entries, query, mood]);
}
