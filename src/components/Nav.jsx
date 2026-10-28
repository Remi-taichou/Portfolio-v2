function Nav() {
  const links = ['Home', 'Projects', 'About', 'Contact']

  return (
    <nav>
      <span>Testimony Charles</span>
      <div>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Nav