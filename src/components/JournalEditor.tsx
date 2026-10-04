import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CalendarDays, Check, PenLine } from 'lucide-react'
import type { JournalEntry } from '../types/journal'
import { formatEntryDate, getLocalDateString, MOODS } from '../types/journal'

interface JournalEditorProps {
  entries: readonly JournalEntry[]
  entry?: JournalEntry
  onBack: () => void
  onSave: (entry: Omit<JournalEntry, 'updatedAt'>) => void
}

export function JournalEditor({ entries, entry, onBack, onSave }: JournalEditorProps) {
  const [date, setDate] = useState(entry?.date ?? getLocalDateString())
  const [mood, setMood] = useState(entry?.mood ?? 'Good')
  const [text, setText] = useState(entry?.text ?? '')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setDate(entry?.date ?? getLocalDateString())
    setMood(entry?.mood ?? 'Good')
    setText(entry?.text ?? '')
    setFormError('')
  }, [entry])

  const conflictingEntry = useMemo(
    () => entries.find((existing) => existing.date === date && existing.date !== entry?.date),
    [date, entries, entry?.date],
  )
  const dateEntry = entries.find((existing) => existing.date === date)
  const isUpdating = Boolean(entry) || Boolean(dateEntry)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!text.trim()) {
      setFormError('Write a few words before saving your entry.')
      return
    }
    if (conflictingEntry) {
      setFormError('An entry already exists for this date. Open it from My Journals to edit it.')
      return
    }

    onSave({ date, mood, text: text.trim() })
  }

  function handleDateChange(value: string) {
    setDate(value)
    const existing = entries.find((candidate) => candidate.date === value)
    if (existing && existing.date !== entry?.date) {
      setMood(existing.mood)
      setText(existing.text)
    }
    setFormError('')
  }

  return (
    <section className="mx-auto max-w-[850px]">
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-[#777c71] transition hover:text-[#344c39] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66816a]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="overflow-hidden rounded-[28px] border border-[#e9e5dc] bg-[#fffefa] shadow-[0_24px_70px_-58px_rgba(44,57,44,0.5)]">
        <div className="paper-grain border-b border-[#e9e5dc] bg-[#f2f0e9] px-6 py-8 sm:px-10 sm:py-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dedfd4] bg-[#f9f8f2]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#798275]">
            <PenLine size={12} />
            Your private pages
          </span>
          <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[#303d32] sm:text-[46px]">
            {isUpdating ? 'A page for today' : 'A page of your own'}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#777a70]">
            Take a breath. There is no right way to write this.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-7 sm:px-10 sm:py-9">
          <div className="grid gap-7 sm:grid-cols-[1fr_1.2fr] sm:gap-10">
            <label className="block">
              <span className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7c8075]">
                <CalendarDays size={14} />
                Entry date
              </span>
              <input
                type="date"
                value={date}
                onChange={(event) => handleDateChange(event.target.value)}
                required
                className="min-h-12 w-full rounded-xl border border-[#e5e2d9] bg-[#fbfaf6] px-4 text-sm text-[#394238] outline-none transition focus:border-[#8ca18a] focus:ring-4 focus:ring-[#e8eee4]"
              />
              {dateEntry && !entry && (
                <span className="mt-2 block text-xs leading-relaxed text-[#798275]">
                  You already wrote on {formatEntryDate(date)}. Saving will update that page.
                </span>
              )}
            </label>

            <fieldset>
              <legend className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7c8075]">
                How are you feeling?
              </legend>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((option) => {
                  const selected = mood === option.label
                  return (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setMood(option.label)}
                      className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a] ${
                        selected
                          ? 'border-[#839580] bg-[#e9eee5] font-medium text-[#354c39]'
                          : 'border-[#e9e6de] bg-white text-[#777a70] hover:border-[#c8d2c4] hover:bg-[#f8f8f3]'
                      }`}
                    >
                      <span aria-hidden="true">{option.emoji}</span>
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          <label className="mt-8 block">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7c8075]">
              What’s on your mind?
            </span>
            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value)
                setFormError('')
              }}
              rows={10}
              maxLength={10000}
              placeholder="Start anywhere. What would you like to remember about today?"
              className="w-full resize-y rounded-xl border border-[#e9e6de] bg-[#fffefa] px-4 py-4 font-serif text-[17px] leading-[1.8] text-[#41463e] outline-none placeholder:text-[#b2b1a8] focus:border-[#8ca18a] focus:ring-4 focus:ring-[#e8eee4]"
            />
            <span className="mt-2 block text-right text-[11px] text-[#aaa99f]">
              {text.length.toLocaleString()} / 10,000
            </span>
          </label>

          {conflictingEntry && (
            <p role="alert" className="mt-3 text-sm text-[#a44c3f]">
              This date already has an entry. Open it from My Journals to edit it.
            </p>
          )}
          {formError && (
            <p role="alert" className="mt-3 text-sm text-[#a44c3f]">
              {formError}
            </p>
          )}

          <div className="mt-5 flex flex-col-reverse justify-between gap-3 border-t border-[#efede6] pt-5 sm:flex-row sm:items-center">
            <p className="text-xs text-[#a09f95]">Saved privately on this device.</p>
            <button
              type="submit"
              disabled={Boolean(conflictingEntry)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#344c39] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#293e2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Check size={16} />
              {isUpdating ? 'Update journal' : 'Save journal'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
