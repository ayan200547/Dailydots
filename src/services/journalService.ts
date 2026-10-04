import type { JournalEntry } from '../types/journal'

const STORAGE_KEY = 'daybook.journal-entries.v1'

function isJournalEntry(value: unknown): value is JournalEntry {
  if (typeof value !== 'object' || value === null) return false

  const entry = value as Record<string, unknown>
  return (
    typeof entry.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
    typeof entry.mood === 'string' &&
    typeof entry.text === 'string' &&
    typeof entry.updatedAt === 'string'
  )
}

function readEntries(): JournalEntry[] {
  const storedValue = window.localStorage.getItem(STORAGE_KEY)
  if (storedValue === null) return []

  const parsed: unknown = JSON.parse(storedValue)
  if (!Array.isArray(parsed) || !parsed.every(isJournalEntry)) {
    throw new Error('Saved journal data is invalid.')
  }

  return parsed
}

function writeEntries(entries: readonly JournalEntry[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export const journalService = {
  getAll(): JournalEntry[] {
    return readEntries().sort((first, second) => second.date.localeCompare(first.date))
  },

  save(entry: Omit<JournalEntry, 'updatedAt'>): JournalEntry {
    const entries = readEntries()
    const savedEntry: JournalEntry = { ...entry, updatedAt: new Date().toISOString() }
    const nextEntries = entries.filter((existing) => existing.date !== entry.date)
    nextEntries.push(savedEntry)
    writeEntries(nextEntries)
    return savedEntry
  },

  deleteByDate(date: string): void {
    writeEntries(readEntries().filter((entry) => entry.date !== date))
  },
}
