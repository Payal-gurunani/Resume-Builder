import { useState, useEffect } from 'react'
import './App.css'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import IconButton from '@mui/material/IconButton'
import PersonalInfoForm from './components/PersonalInfo.jsx'
import EducationSection from './components/EducationSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import HomePage from './pages/Home.jsx'
import ProjectsSection from './components/ProjectSection.jsx'
import CertificatesSection from './components/Certificate.jsx'
import AchievementsSection from './components/AchievementsSection.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import Preview from './components/Preview.jsx'
import Objective from './components/objective.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', github: '' },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certificates: [],
    achievements: [],
    objective: ''
  })

  const [page, setPage] = useState('home')
  const [selectedTemplate, setSelectedTemplate] = useState('templateOne')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  },[])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
    }
  })
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <div>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

      </div>
      <div className="p-4">
        {page === 'home' && <HomePage onNavigate={setPage} />}
        {page === 'personal' && (
          <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'education' && (
          <EducationSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'experience' && (
          <ExperienceSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'skills' && (
          <SkillsSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'project' && (
          <ProjectsSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'objective' && (
          <Objective resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'certificate' && (
          <CertificatesSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'achievements' && (
          <AchievementsSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
        )}
        {page === 'preview' && (
          <>
    <TemplateSelector
      selectedTemplate={selectedTemplate}
      onSelect={setSelectedTemplate}
    />
    <Preview
      resumeData={resumeData}
      selectedTemplate={selectedTemplate}
    
    />
  </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App