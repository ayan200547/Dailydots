import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { JournalEntry } from '../types/journal'
import { formatEntryDate, getMoodEmoji } from '../types/journal'

interface JournalCardProps {
  entry: JournalEntry
  onOpen: (entry: JournalEntry) => void
}

export function JournalCard({ entry, onOpen }: JournalCardProps) {
  return (
    <button
      onClick={() => onOpen(entry)}
      className="group flex w-full flex-col rounded-2xl border border-[#eae6dd] bg-[#fffefa] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#d8dfd3] hover:shadow-[0_12px_35px_-28px_rgba(47,65,48,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a] sm:p-6"
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8e9085]">
          {formatEntryDate(entry.date, { month: 'short', day: 'numeric' })}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#f3f2ec] px-2.5 py-1 text-xs text-[#656b60]">
          <span aria-hidden="true">{getMoodEmoji(entry.mood)}</span>
          {entry.mood}
        </span>
      </span>
      <span className="mt-5 line-clamp-3 min-h-[72px] w-full whitespace-pre-wrap font-serif text-[17px] leading-[1.55] text-[#42483e]">
        {entry.text || 'A quiet moment, captured.'}
      </span>
      <span className="mt-5 flex w-full items-center justify-between border-t border-[#efede6] pt-4 text-xs font-medium text-[#7c8476]">
        <span className="flex items-center gap-2">
          <BookOpen size={14} />
          Read entry
        </span>
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </button>
  )
}
