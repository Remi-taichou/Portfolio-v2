function ProjectCard({ title, description, tag, live, code }) {
  return (
    <article className="card">
      <span className="card-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>

      {(live || code) && (
        <div className="card-links">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer">
              Live site ↗
            </a>
          )}
          {code && (
            <a href={code} target="_blank" rel="noopener noreferrer">
              Code ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default ProjectCard