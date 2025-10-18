import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import UploadProject from "./pages/UploadProject";
import ProjectList from "./pages/ProjectList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectPage from "./pages/ProjectPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadProject />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
