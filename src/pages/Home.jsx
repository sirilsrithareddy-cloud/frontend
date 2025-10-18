import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>🎓 COLLEGE PROJECT SHOWCASE </h1>
      <p>Upload, Explore, and rate student Projects easily!!</p>

      <div className="home-buttons">
        <a href="/upload" className="btn">📤 Upload Project</a>
        <a href="/projects" className="btn btn-secondary">📚 View Projects</a>
      </div>
    </div>
  );
}

export default Home;
