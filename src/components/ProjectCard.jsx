function ProjectCard({ title, description, tag }) {
  return (
    <article className="card">
      <span className="card-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default ProjectCard