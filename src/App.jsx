import { useState, useEffect } from 'react'
import './App.css'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import IconButton from '@mui/material/IconButton'
import HomePage from './pages/Home.jsx'
import LeftSidebar from './sidebar/LeftSidebar.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import Preview from './components/Preview.jsx'
import Drawer from '@mui/material/Drawer'

import { ExportJsonButton, ImportJsonInput } from './components/JSONImportExport.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import RightSidebar from './sidebar/RightSideBar.jsx'
function App() {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [fontFamily, setFontFamily] = useState('Arial');
  const [primaryColor, setPrimaryColor] = useState('#1f2937');
  const [spacing, setSpacing] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [visibleSections, setVisibleSections] = useState({
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certificates: true,
    achievements: true,
    objective: true
  });

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
          sx={{ position: 'absolute', top: 16,right:40 }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>

{/* Mobile toggle button for Right Sidebar */}
<button
  className="md:hidden fixed bottom-4 right-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg"
  onClick={() => setIsRightSidebarOpen(true)}
  aria-label="Open settings"
>
  ⚙️
</button>

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
            fontFamily={fontFamily}
            primaryColor={primaryColor}
            spacing={spacing}
            zoom={zoom}
            visibleSections={visibleSections}
          />

        </main>

        <aside className="hidden md:block border-l h-screen overflow-y-auto">
          <Drawer
  anchor="right"
  open={isRightSidebarOpen}
  onClose={() => setIsRightSidebarOpen(false)}
  PaperProps={{ style: { width: '80vw', maxWidth: 350 } }}
>
  <RightSidebar
    fontFamily={fontFamily}
    setFontFamily={setFontFamily}
    primaryColor={primaryColor}
    setPrimaryColor={setPrimaryColor}
    spacing={spacing}
    setSpacing={setSpacing}
    zoom={zoom}
    setZoom={setZoom}
    visibleSections={visibleSections}
    setVisibleSections={setVisibleSections}
  />
</Drawer>

          <RightSidebar
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            spacing={spacing}
            setSpacing={setSpacing}
            zoom={zoom}
            setZoom={setZoom}
            visibleSections={visibleSections}
            setVisibleSections={setVisibleSections}
          />

        </aside>
      </div>
      <div className="p-4">


      </div>
    </ThemeProvider>
  )
}

export default App