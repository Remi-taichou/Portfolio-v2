import { useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const filters = ['All', 'Design', 'Code']

function Projects() {
  const [active, setActive] = useState('All')
  const trackRef = useRef(null)

  const visible =
    active === 'All' ? projects : projects.filter((p) => p.tag === active)

  function scrollByCard(direction) {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  function chooseFilter(f) {
    setActive(f)
    trackRef.current?.scrollTo({ left: 0 })
  }

  return (
    <section id="projects">
      <div className="projects-head">
        <h2>Projects</h2>
        <div className="arrows">
          <button aria-label="Scroll projects left" onClick={() => scrollByCard(-1)}>←</button>
          <button aria-label="Scroll projects right" onClick={() => scrollByCard(1)}>→</button>
        </div>
      </div>

      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            aria-pressed={active === f}
            onClick={() => chooseFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card-track" ref={trackRef} tabIndex={0} aria-label="Projects">
        {visible.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects