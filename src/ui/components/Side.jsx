import { Activity, Computer, DiscAlbumIcon, HousePlug, Layers, ShieldCheck, UserRound, Users2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-slate-200 bg-white shadow-sm lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center px-4 py-4 lg:h-auto">
          <div className="overflow-hidden rounded-full p-1">
            <Link className='active:scale-95 transition-transform relative items-center text-primary dark:text-primary-dark p-1 whitespace-nowrap outline-link rounded-full 3xl:rounded-xl inline-flex text-lg font-normal gap-2' to='/'>
              <img
                width='60px'
                height='60px'
                src='https://intercocina.com/assets/imgs/intercocina-logo.png'
              // alt='INTERPRODUCTION'
              />
              <span className='sr-only 3xl:not-sr-only'>INTERCOCINA</span>
            </Link>
          </div>
      </div>

      <button
        type="button"
        className="group absolute right-0 top-0 flex h-16 items-center gap-x-2 px-4 lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
          Menu
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 text-slate-700 group-hover:text-indigo-600 transition-colors"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        className={`overflow-y-auto lg:static lg:block ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="space-y-8 px-3 pb-24 pt-6">
          <NavSection title="Production">

            <NavLink href="/production">
              <Computer size={20} /> <span>Atelier</span>
            </NavLink>

            <NavLink href="/of">
              <Layers size={20} /> <span>Order de fabrication</span>
            </NavLink>

            <NavLink href="/machines">
              <DiscAlbumIcon size={20} /> <span>Machines</span>
            </NavLink>

            <NavLink href="/personnel">
              <UserRound size={20} /> <span>Personnel</span>
            </NavLink>
          </NavSection>

          <NavSection title="Parametre">
          <NavLink href="/ateliers">
              <HousePlug size={20} /> <span>Ateliers</span>
            </NavLink>

            <NavLink href="/users">
              <Users2 size={20} /> <span>Utilisateur</span>
            </NavLink>

            <NavLink href="/roles">
              <ShieldCheck size={20} /> <span>Role</span>
            </NavLink>

            <NavLink href="/journaux">
              <Activity size={20} /> <span>Journaux D'activité</span>
            </NavLink>

          </NavSection>


        </nav>
      </div>
    </div>
  )
}

function NavSection({ title, children }) {
  return (
    <div>
      <div className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      className="flex gap-2 items-center rounded-md px-3 py-2 text-md font-medium text-slate-700 hover:bg-gray-200 hover:text-gray-600 transition-colors"
      to={href}
    >
      {children}
    </Link>
  )
}