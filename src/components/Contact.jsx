const contactLinks = [
  { label: 'Email', href: 'mailto:charlestesty474@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Remi-taichou' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/testimony-charles-658b2333a' },
]

function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <div className="contact-links">
        {contactLinks.map((link) => (
          <a key={link.label} href={link.href} className="btn btn-secondary">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact