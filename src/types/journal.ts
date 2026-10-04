export interface JournalEntry {
  date: string
  mood: string
  text: string
  updatedAt: string
}

export interface MoodOption {
  label: string
  emoji: string
}

export const MOODS: readonly MoodOption[] = [
  { label: 'Radiant', emoji: '😊' },
  { label: 'Good', emoji: '🙂' },
  { label: 'Okay', emoji: '😐' },
  { label: 'Low', emoji: '😔' },
  { label: 'Anxious', emoji: '😣' },
]

export function getMoodEmoji(mood: string): string {
  return MOODS.find((option) => option.label === mood)?.emoji ?? '✦'
}

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatEntryDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(new Date(`${date}T00:00:00Z`))
}
