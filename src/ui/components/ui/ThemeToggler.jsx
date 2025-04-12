import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      title='Theme Mode'
      className='flex items-center justify-center w-12 h-12 transition-transform rounded-full active:scale-95 hover:bg-primary/5 hover:dark:bg-primary-dark/5 outline-link cursor-pointer hover:bg-gray-300'
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  )
}

export default ThemeToggler
