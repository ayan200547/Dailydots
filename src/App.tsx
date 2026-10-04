import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CirclePlus,
  Feather,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { JournalCard } from './components/JournalCard'
import { JournalEditor } from './components/JournalEditor'
import { Sidebar, type PageName } from './components/Sidebar'
import { journalService } from './services/journalService'
import type { JournalEntry } from './types/journal'
import { formatEntryDate, getLocalDateString, getMoodEmoji } from './types/journal'

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [activePage, setActivePage] = useState<PageName>('home')
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>()
  const [openedEntry, setOpenedEntry] = useState<JournalEntry | undefined>()
  const [editorBackPage, setEditorBackPage] = useState<'home' | 'journals'>('home')
  const [storageError, setStorageError] = useState('')

  const pageTitle =
    activePage === 'home'
      ? 'Home - MyDots'
      : activePage === 'editor'
        ? 'Add journal - MyDots'
        : 'MyJournal - MyDots'

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  useEffect(() => {
    try {
      setEntries(journalService.getAll())
    } catch {
      setStorageError('Your saved journals could not be loaded. Check your browser storage and refresh.')
    }
  }, [])

  const todayEntry = useMemo(
    () => entries.find((entry) => entry.date === getLocalDateString()),
    [entries],
  )
  const recentEntries = entries.slice(0, 3)
  const currentStreak = useMemo(() => {
    const dateSet = new Set(entries.map((entry) => entry.date))
    const cursor = new Date()
    let streak = 0
    if (!dateSet.has(getLocalDateString(cursor))) {
      cursor.setDate(cursor.getDate() - 1)
    }
    while (dateSet.has(getLocalDateString(cursor))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return streak
  }, [entries])

  function navigate(page: PageName) {
    setActivePage(page)
    setOpenedEntry(undefined)
    if (page === 'editor') setEditingEntry(undefined)
  }

  function beginEdit(entry?: JournalEntry) {
    setEditorBackPage(openedEntry || activePage === 'journals' ? 'journals' : 'home')
    setEditingEntry(entry)
    setOpenedEntry(undefined)
    setActivePage('editor')
  }

  function saveEntry(entry: Omit<JournalEntry, 'updatedAt'>) {
    try {
      const savedEntry = journalService.save(entry)
      setEntries(journalService.getAll())
      setEditingEntry(undefined)
      setOpenedEntry(savedEntry)
      setActivePage('journals')
      setStorageError('')
    } catch {
      setStorageError('Your journal could not be saved. Check available browser storage and try again.')
    }
  }

  function deleteEntry(entry: JournalEntry) {
    const confirmed = window.confirm(`Delete your journal from ${formatEntryDate(entry.date)}?`)
    if (!confirmed) return

    try {
      journalService.deleteByDate(entry.date)
      setEntries(journalService.getAll())
      setOpenedEntry(undefined)
      setStorageError('')
    } catch {
      setStorageError('That journal could not be deleted. Please try again.')
    }
  }

  function openEntry(entry: JournalEntry) {
    setOpenedEntry(entry)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] md:flex">
      <Sidebar activePage={activePage} onNavigate={navigate} />
      <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-11">
        <div className="mx-auto max-w-[1100px]">
          <header className="mb-8 flex items-center justify-between gap-4 border-b border-[#e8e4da] pb-5 sm:mb-10 sm:pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#98998d]">
                {formatEntryDate(getLocalDateString(), { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="mt-1 font-serif text-[25px] tracking-[-0.025em] text-[#354036] sm:text-[29px]">
                {pageTitle}
              </h1>
            </div>
            <button
              onClick={() => beginEdit()}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#344c39] px-4 text-sm font-medium text-white transition hover:bg-[#293e2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
            >
              <CirclePlus size={17} />
              <span className="hidden sm:inline">New entry</span>
              <span className="sm:hidden">New</span>
            </button>
          </header>

          {storageError && (
            <div
              role="alert"
              className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-[#e7c8bd] bg-[#fff4ef] px-4 py-3 text-sm text-[#8b4e41]"
            >
              <span>{storageError}</span>
              <button
                onClick={() => setStorageError('')}
                aria-label="Dismiss message"
                className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-[#a44c3f]"
              >
                ×
              </button>
            </div>
          )}

          {activePage === 'editor' ? (
            <JournalEditor
              entries={entries}
              entry={editingEntry}
              onBack={() => navigate(editorBackPage)}
              onSave={saveEntry}
            />
          ) : openedEntry ? (
            <article className="mx-auto max-w-[790px]">
              <button
                onClick={() => setOpenedEntry(undefined)}
                className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#777c71] transition hover:text-[#344c39] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66816a]"
              >
                <ArrowRight size={15} className="rotate-180" />
                Back to journals
              </button>
              <div className="overflow-hidden rounded-[26px] border border-[#e9e5dc] bg-[#fffefa]">
                <div className="paper-grain border-b border-[#e9e5dc] bg-[#f2f0e9] px-6 py-8 sm:px-10 sm:py-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#798275]">
                      <CalendarDays size={14} />
                      {formatEntryDate(openedEntry.date)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#dedfd4] bg-[#f9f8f2]/80 px-3 py-1.5 text-sm text-[#646a60]">
                      <span aria-hidden="true">{getMoodEmoji(openedEntry.mood)}</span>
                      {openedEntry.mood}
                    </span>
                  </div>
                  <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[#303d32] sm:text-[46px]">
                    A day in your words
                  </h2>
                </div>
                <div className="px-6 py-8 sm:px-10 sm:py-10">
                  <p className="whitespace-pre-wrap font-serif text-[18px] leading-[1.9] text-[#454940]">
                    {openedEntry.text}
                  </p>
                  <div className="mt-9 flex flex-col-reverse justify-between gap-3 border-t border-[#efede6] pt-5 sm:flex-row sm:items-center">
                    <span className="text-xs text-[#a09f95]">
                      Last saved {new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(openedEntry.updatedAt))}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteEntry(openedEntry)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e8e2d9] px-3 text-sm font-medium text-[#8c655a] transition hover:bg-[#fff5f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a46e5f]"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                      <button
                        onClick={() => beginEdit(openedEntry)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#344c39] px-4 text-sm font-medium text-white transition hover:bg-[#293e2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
                      >
                        <Feather size={15} />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : activePage === 'home' ? (
            <HomePage
              todayEntry={todayEntry}
              recentEntries={recentEntries}
              entryCount={entries.length}
              currentStreak={currentStreak}
              onQuickAdd={() => beginEdit(todayEntry)}
              onOpen={openEntry}
              onViewAll={() => navigate('journals')}
            />
          ) : (
            <JournalsPage entries={entries} onOpen={openEntry} onAdd={() => beginEdit()} />
          )}

          <footer className="mx-auto mt-14 max-w-[1100px] border-t border-[#e8e4da] pt-5 text-center text-[11px] text-[#aaa99f]">
            A gentle place to meet yourself where you are.
          </footer>
        </div>
      </main>
    </div>
  )
}

interface HomePageProps {
  todayEntry?: JournalEntry
  recentEntries: JournalEntry[]
  entryCount: number
  currentStreak: number
  onQuickAdd: () => void
  onOpen: (entry: JournalEntry) => void
  onViewAll: () => void
}

function HomePage({
  todayEntry,
  recentEntries,
  entryCount,
  currentStreak,
  onQuickAdd,
  onOpen,
  onViewAll,
}: HomePageProps) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[26px] border border-[#e1e4d9] bg-[#e9eee5] px-6 py-8 sm:px-10 sm:py-10">
        <div className="absolute -right-12 -top-16 size-56 rounded-full border border-[#d6dfd1] opacity-80 sm:right-10 sm:top-[-95px] sm:size-72" />
        <div className="absolute -right-5 -top-9 size-40 rounded-full border border-[#d6dfd1] opacity-80 sm:right-16 sm:top-[-65px] sm:size-56" />
        <div className="relative max-w-[620px]">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f806b]">
            <Sparkles size={13} />
            Small thoughts, gently kept
          </span>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.1] tracking-[-0.04em] text-[#314035] sm:text-[44px]">
            Your day is worth
            <br />
            remembering.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#71796e]">
            This is your space to pause, notice how you feel, and leave a little note for tomorrow-you.
          </p>
          <button
            onClick={onQuickAdd}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#344c39] px-4 text-sm font-medium text-white transition hover:bg-[#293e2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
          >
            <Feather size={16} />
            {todayEntry ? 'Continue today’s entry' : 'Write today’s entry'}
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="absolute bottom-8 right-8 hidden rotate-[-9deg] text-[#82917c] sm:block">
          <span className="block font-serif text-6xl leading-none">“</span>
          <span className="ml-4 mt-[-13px] block font-serif text-sm italic">begin anywhere</span>
        </div>
      </section>

      <section aria-label="Journal summary" className="grid gap-3 sm:grid-cols-3">
        <SummaryCard icon={<BookOpen size={17} />} label="Pages written" value={entryCount.toString()} detail="Every page is a small win" />
        <SummaryCard icon={<Sparkles size={17} />} label="Current streak" value={currentStreak.toString()} detail={currentStreak === 1 ? 'day in a row' : 'days in a row'} />
        <SummaryCard icon={<CalendarDays size={17} />} label="Today" value={todayEntry ? 'Captured' : 'Open page'} detail={todayEntry ? `${getMoodEmoji(todayEntry.mood)} Feeling ${todayEntry.mood.toLowerCase()}` : 'A fresh page is waiting'} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#99998d]">
              From your pages
            </span>
            <h2 className="mt-1 font-serif text-[23px] tracking-[-0.025em] text-[#354036]">
              Recent reflections
            </h2>
          </div>
          {recentEntries.length > 0 && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-1 rounded-lg pb-1 text-xs font-medium text-[#71816e] transition hover:text-[#344c39] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
            >
              All journals <ChevronRight size={14} />
            </button>
          )}
        </div>
        {recentEntries.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-3">
            {recentEntries.map((entry) => (
              <JournalCard key={entry.date} entry={entry} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#dcd9d0] bg-[#fbfaf7] px-5 py-8 text-center">
            <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#edf0e9] text-[#71816e]">
              <BookOpen size={19} />
            </span>
            <h3 className="mt-3 font-serif text-lg text-[#475046]">Your story starts here</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-[#929187]">
              A sentence is enough. Write your first entry whenever you’re ready.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

interface SummaryCardProps {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
}

function SummaryCard({ icon, label, value, detail }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#e9e6dd] bg-[#fbfaf7] px-4 py-4 sm:px-5">
      <div className="flex items-center gap-2 text-[#8a9184]">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="font-serif text-[25px] leading-none tracking-tight text-[#3d4a3e]">{value}</span>
        <span className="text-right text-[11px] text-[#a1a196]">{detail}</span>
      </div>
    </div>
  )
}

interface JournalsPageProps {
  entries: JournalEntry[]
  onOpen: (entry: JournalEntry) => void
  onAdd: () => void
}

function JournalsPage({ entries, onOpen, onAdd }: JournalsPageProps) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#99998d]">
            The story so far
          </span>
          <p className="mt-1 text-sm text-[#85877d]">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} · newest first
          </p>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#dcded4] bg-[#fbfaf7] px-3 text-sm font-medium text-[#596c59] transition hover:bg-[#edf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
        >
          <Feather size={15} />
          Add a page
        </button>
      </div>

      {entries.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <JournalCard key={entry.date} entry={entry} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="rounded-[26px] border border-dashed border-[#dcd9d0] bg-[#fbfaf7] px-6 py-14 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#edf0e9] text-[#71816e]">
            <BookOpen size={20} />
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#475046]">No pages yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#929187]">
            Choose a date, pick a mood, and make your first note. Your entries will be here when you need them.
          </p>
          <button
            onClick={onAdd}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#344c39] px-4 text-sm font-medium text-white transition hover:bg-[#293e2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a]"
          >
            <Feather size={15} />
            Write your first entry
          </button>
        </div>
      )}
    </section>
  )
}

export default App
