import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem" }}>
      <h3>{project.title}</h3>
      <p>{project.description?.slice(0, 100)}...</p>
      <p>⭐ {project.avgRating || 0}</p>
      <Link to={`/projects/${project._id}`}>View Details</Link>
    </div>
  );
}

export default ProjectCard;
