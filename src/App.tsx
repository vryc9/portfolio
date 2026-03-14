import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectMarkdownPage from "./components/ProjectMarkdownPage";
import Home from "./components/Home";
import SkillMarkdownPage from "./components/SkillMarkdownPage";
import { APP_BASENAME, APP_ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter basename={APP_BASENAME}>
      <Routes>
        <Route path={APP_ROUTES.home} element={<Home />} />
        <Route path={APP_ROUTES.projectDetails} element={<ProjectMarkdownPage />} />
        <Route path={APP_ROUTES.skillDetails} element={<SkillMarkdownPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
