import { useState, useEffect } from 'react'
import './App.css'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import IconButton from '@mui/material/IconButton'
import HomePage from './pages/Home.jsx'
import LeftSidebar from './sidebar/LeftSidebar.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import Preview from './components/Preview.jsx'

import { ExportJsonButton, ImportJsonInput } from './components/JSONImportExport.jsx'
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
  }, [])

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


<div className="relative h-screen grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr]">
  {/* Sidebar (only hidden on mobile) */}
  <aside className="hidden md:block border-r">
    <LeftSidebar
      resumeData={resumeData}
      setResumeData={setResumeData}
    />
  </aside>

  {/* Sidebar toggle (mobile only) */}
  <div className="md:hidden absolute top-4 left-4 z-50">
    <LeftSidebar
      resumeData={resumeData}
      setResumeData={setResumeData}
      mobileToggleOnly={false}
    />
  </div>

  {/* Main content */}
  <main className="overflow-y-auto p-2">
     <ExportJsonButton resumeData={resumeData} />
      <ImportJsonInput setResumeData={setResumeData} />
    <TemplateSelector
      selectedTemplate={selectedTemplate}
      onSelect={setSelectedTemplate}
    />
    <Preview
      resumeData={resumeData}
      selectedTemplate={selectedTemplate}
    />
  </main>        
      </div>
      <div className="p-4">

       
      </div>
    </ThemeProvider>
  )
}

export default App