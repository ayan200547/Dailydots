import { BookOpen, CalendarDays, Feather, House, Plus } from 'lucide-react'

export type PageName = 'home' | 'journals' | 'editor'

interface SidebarProps {
  activePage: PageName
  onNavigate: (page: PageName) => void
}

const navigationItems: { label: string; page: PageName; icon: typeof House }[] = [
  { label: 'Home', page: 'home', icon: House },
  { label: 'My journals', page: 'journals', icon: BookOpen },
]

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#e8e4da] bg-[#fbfaf7] px-5 py-4 md:min-h-screen md:w-[252px] md:border-b-0 md:border-r md:px-6 md:py-8">
      <button
        className="flex w-fit items-center gap-3 rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66816a]"
        onClick={() => onNavigate('home')}
        aria-label="MyDots home"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#304638] text-[#f4f0e7]">
          <Feather size={19} strokeWidth={1.8} />
        </span>
        <span>
          <span className="block font-serif text-[22px] leading-none tracking-tight text-[#2d392f]">
            MyDots
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-[#93958a]">
            a little space for you
          </span>
        </span>
      </button>

      <div className="mt-8 flex items-center gap-2 md:mt-14">
        <span className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#a3a195]">
          Your space
        </span>
        <span className="h-px flex-1 bg-[#e9e5dc]" />
      </div>

      <nav aria-label="Main navigation" className="mt-3 flex gap-2 md:flex-col">
        {navigationItems.map(({ label, page, icon: Icon }) => {
          const isActive = activePage === page
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a] ${
                isActive
                  ? 'bg-[#e9eee5] text-[#344c39]'
                  : 'text-[#73766c] hover:bg-[#f1efe9] hover:text-[#344c39]'
              }`}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </button>
          )
        })}
        <button
          onClick={() => onNavigate('editor')}
          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66816a] ${
            activePage === 'editor'
              ? 'bg-[#e9eee5] text-[#344c39]'
              : 'text-[#73766c] hover:bg-[#f1efe9] hover:text-[#344c39]'
          }`}
        >
          <Plus size={17} strokeWidth={1.8} />
          Add a journal
        </button>
      </nav>

      <div className="mt-8 hidden rounded-2xl bg-[#f1efe9] p-4 md:mt-auto md:block">
        <CalendarDays size={17} className="text-[#778875]" strokeWidth={1.7} />
        <p className="mt-3 font-serif text-[16px] leading-snug text-[#3a473b]">
          Make room for a moment of reflection.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[#898a80]">
          A few honest words can make a day feel a little clearer.
        </p>
      </div>
      <div className="hidden border-t border-[#e8e4da] pt-5 text-[11px] text-[#a3a195] md:mt-6 md:block">
        Your thoughts stay on this device.
      </div>
    </aside>
  )
}
