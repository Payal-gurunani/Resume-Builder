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

      {page !== 'home' && page !== 'preview' && (
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <ImportJsonInput setResumeData={setResumeData} />
        </div>
      )}
       {page === 'preview' && (
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <ExportJsonButton resumeData={resumeData} />
          <ImportJsonInput setResumeData={setResumeData} />
        </div>
      )}

          <div className="grid grid-cols-[400px_1fr_300px]">
      <aside className=" border-r ">
        <LeftSidebar
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </aside>
      </div>
      <div className="p-4">
       
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