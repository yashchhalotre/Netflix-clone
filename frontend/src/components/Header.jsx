import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Home', category: 'all' },
  { label: 'Movies', category: 'popular' },
  { label: 'Series', category: 'series' },
  { label: 'Upcoming', category: 'upcoming' },
  { label: 'Top Rated', category: 'top-rated' }
];

const Header = ({ query, setQuery }) => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const user = JSON.parse(localStorage.getItem('netflixUser') || 'null');

  const goToCategory = (category) => {
    setOpen(false);
    setQuery('');
    setSearchParams(category === 'all' ? {} : { category });
    navigate(category === 'all' ? '/browse' : `/browse?category=${category}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem('netflixUser');
    navigate('/login');
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black via-black/85 to-transparent px-4 py-4 text-white md:px-12">
      <div className="flex items-center justify-between gap-6">
        <Link to="/browse" className="text-3xl font-extrabold tracking-tight text-red-600">NETFLIX</Link>

        <nav className="hidden flex-1 justify-center gap-7 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => goToCategory(item.category)} className="hover:text-gray-300">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded bg-black/60 px-3 py-2 ring-1 ring-white/30">
            <FiSearch className="mr-2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies" className="w-44 bg-transparent text-sm outline-none placeholder:text-gray-300" />
          </div>
          <button onClick={toggleTheme} className="rounded-full bg-white/15 p-2 hover:bg-white/25" title="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <span className="text-sm text-gray-300">{user?.name}</span>
          <button onClick={logoutHandler} className="rounded bg-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-800">Logout</button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {open && (
        <div className="mt-4 rounded bg-black/95 p-4 md:hidden">
          <div className="mb-4 flex items-center rounded bg-zinc-900 px-3 py-2 ring-1 ring-white/20">
            <FiSearch className="mr-2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies" className="w-full bg-transparent text-sm outline-none" />
          </div>
          <div className="grid gap-3 text-sm">
            {navItems.map((item) => <button key={item.label} onClick={() => goToCategory(item.category)} className="text-left">{item.label}</button>)}
            <button onClick={toggleTheme} className="text-left">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
            <button onClick={logoutHandler} className="rounded bg-red-700 px-4 py-2 text-left font-semibold">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
