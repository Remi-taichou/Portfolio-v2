import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const filters = ['All', 'Design', 'Code']

function Projects() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All' ? projects : projects.filter((p) => p.tag === active)

  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            aria-pressed={active === f}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {visible.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects