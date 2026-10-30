import { useState } from 'react'

function Nav() {
  const [open, setOpen] = useState(false)
  const links = ['Home', 'Projects', 'About', 'Contact']

  return (
    <nav>
      <span className="nav-logo">Testimony Charles</span>

      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Nav