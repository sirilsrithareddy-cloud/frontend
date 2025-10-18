import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./UploadProject.css";

function UploadProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim() || !desc.trim()) {
      setError("Title and description are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", desc.trim());
    
    // Add files if any selected
    if (files.length > 0) {
      for (let f of files) {
        formData.append("files", f);
      }
    }

    try {
      const response = await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert("✅ Project uploaded successfully!");
      setTitle("");
      setDesc("");
      setFiles([]);
      navigate("/projects");
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage = err.response?.data?.error || "Error uploading project";
      setError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Your Project</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          placeholder="Project Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Uploading..." : "🚀 Upload Project"}
        </button>
      </form>
    </div>
  );
}

export default UploadProject;
