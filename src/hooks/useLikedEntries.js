import { useMemo } from 'react';

export default function useLikedEntries(entries, likedIds) {
  return useMemo(
    () => entries.filter((entry) => likedIds.has(entry.id)),
    [entries, likedIds],
  );
}
