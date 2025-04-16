import { useState } from 'react'

export default function Side() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800'>
      <div className='flex h-14 items-center px-4 py-4 lg:h-auto'>
        <a className='group flex w-full items-center gap-x-2.5' href='/'>
          <div className='h-7 w-7 rounded-full'>
            <svg
              viewBox='0 0 180 180'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <mask
                id='mask0_408_139'
                style={{ maskType: 'alpha' }}
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='180'
                height='180'
              >
                <circle cx='90' cy='90' r='90' fill='black'></circle>
              </mask>
              <g mask='url(#mask0_408_139)'>
                <circle
                  cx='90'
                  cy='90'
                  r='87'
                  fill='black'
                  stroke='white'
                  strokeWidth='6'
                ></circle>
                <path
                  d='M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z'
                  fill='url(#paint0_linear_408_139)'
                ></path>
                <rect
                  x='115'
                  y='54'
                  width='12'
                  height='72'
                  fill='url(#paint1_linear_408_139)'
                ></rect>
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear_408_139'
                  x1='109'
                  y1='116.5'
                  x2='144.5'
                  y2='160.5'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white'></stop>
                  <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                </linearGradient>
                <linearGradient
                  id='paint1_linear_408_139'
                  x1='121'
                  y1='54'
                  x2='120.799'
                  y2='106.875'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white'></stop>
                  <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className='font-semibold tracking-wide text-gray-400 group-hover:text-gray-50'>
            App Router
          </h3>
        </a>
      </div>

      <button
        type='button'
        className='group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden'
        onClick={toggleMenu}
      >
        <div className='font-medium text-gray-100 group-hover:text-gray-400'>
          Menu
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-hidden='true'
          data-slot='icon'
          className='block w-6 text-gray-400'
        >
          <path
            fillRule='evenodd'
            d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          ></path>
        </svg>
      </button>

      <div
        className={`overflow-y-auto lg:static lg:block ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className='space-y-6 px-2 pb-24 pt-5'>
          <NavSection title='Layouts'>
            <NavLink href='/layouts'>Nested Layouts</NavLink>
            <NavLink href='/route-groups'>Grouped Layouts</NavLink>
            <NavLink href='/parallel-routes'>Parallel Routes</NavLink>
          </NavSection>

          <NavSection title='File Conventions'>
            <NavLink href='/loading'>Loading</NavLink>
            <NavLink href='/error-handling'>Error</NavLink>
            <NavLink href='/not-found'>Not Found</NavLink>
          </NavSection>

          <NavSection title='APIs'>
            <NavLink href='/use-link-status'>useLinkStatus</NavLink>
          </NavSection>

          <NavSection title='Data Fetching'>
            <NavLink href='/streaming'>Streaming with Suspense</NavLink>
            <NavLink href='/ssg'>Static Data</NavLink>
            <NavLink href='/ssr'>Dynamic Data</NavLink>
            <NavLink href='/isr'>Incremental Static Regeneration</NavLink>
          </NavSection>

          <NavSection title='Components'>
            <NavLink href='/context'>Client Context</NavLink>
          </NavSection>

          <NavSection title='Misc'>
            <NavLink href='/patterns'>Patterns</NavLink>
            <NavLink href='/hooks'>Client Component Hooks</NavLink>
            <NavLink href='/styling'>CSS and CSS-in-JS</NavLink>
          </NavSection>
        </nav>
      </div>
    </div>
  )
}

function NavSection({ title, children }) {
  return (
    <div>
      <div className='mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80'>
        <div>{title}</div>
      </div>
      <div className='space-y-1'>{children}</div>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      className='flex justify-between rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300 text-gray-400 hover:bg-gray-800'
      href={href}
    >
      {children}
    </a>
  )
}
