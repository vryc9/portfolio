import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectMarkdownPage from './components/ProjectMarkdownPage'
import Home from './components/Home'
import SkillMarkdownPage from './components/SkillMarkdownPage';

function App() {
  return (
    <BrowserRouter basename='/portfolio'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projetName" element={<ProjectMarkdownPage />} />
        <Route path="/skills/:skillName" element={<SkillMarkdownPage />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
