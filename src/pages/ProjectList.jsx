import { useEffect, useState } from "react";
import API from "../services/api";
import "./ProjectList.css";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  // handle rating click
  const handleRating = async (projectId, rating) => {
    try {
      await API.post(`/projects/${projectId}/rate`, { rating });
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, avgRating: rating } : p
        )
      );
      alert(`You rated ${rating} ⭐`);
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  const renderStars = (project) => {
    const stars = [];
    const rating = Math.round(project.avgRating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "star filled" : "star"}
          onClick={() => handleRating(project._id, i)}
          style={{ cursor: "pointer" }}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="projects-container">
      <h2>📚 Student Projects</h2>

      {projects.length === 0 ? (
        <p className="no-projects">No projects uploaded yet.</p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-rating">
                {renderStars(project)}
              </div>

              {project.files && project.files.length > 0 && (
                <a
                  href={project.files[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-view"
                >
                  🔗 View File
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
