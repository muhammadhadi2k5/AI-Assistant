export type SearchHistoryEntry = {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  query: string;
  viewedAt: string;
};

const STORAGE_KEY = "student-search-history:v1";
const MAX_ENTRIES = 8;

export function getSearchHistory(): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SearchHistoryEntry[];
  } catch {
    return [];
  }
}

export function addSearchHistoryEntry(entry: Omit<SearchHistoryEntry, "viewedAt">): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];
  const withoutDuplicate = getSearchHistory().filter((e) => e.id !== entry.id);
  const next = [{ ...entry, viewedAt: new Date().toISOString() }, ...withoutDuplicate].slice(0, MAX_ENTRIES);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearSearchHistory(): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];
  window.localStorage.removeItem(STORAGE_KEY);
  return [];
}
