import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>⭐ {project.avgRating}</p>
      <h3>Ratings</h3>
      {project.ratings?.map((r, i) => (
        <p key={i}>
          {r.score}⭐ - {r.comment}
        </p>
      ))}
    </div>
  );
}

export default ProjectPage;
