import { useState ,useEffect} from 'react'
import './App.css'
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
function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', github: '' },
    education: [],
    experience: [],
    skills: [],
    projects: [],
     certificates: [],
      achievements: [],
      objective : '' 
  })

  const [page, setPage] = useState('home')
  const [selectedTemplate, setSelectedTemplate] = useState('templateOne')

  useEffect(()=>{
  localStorage.setItem('resumeData' , JSON.stringify(resumeData))
},[resumeData])
  return (
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
      {page=== 'project' && (
        <ProjectsSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
      )}
      {page==='objective' && (
        <Objective resumeData={resumeData} setResumeData ={setResumeData} onNavigate={setPage}/>
      )}
      {page=== 'certificate' && (
        <CertificatesSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
      )}
      {page=== 'achievements' && (
        <AchievementsSection resumeData={resumeData} setResumeData={setResumeData} onNavigate={setPage} />
      )}
      {page==='preview' && (
        <>
        <TemplateSelector  selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate}/>
        <Preview resumeData={resumeData} selectedTemplate={selectedTemplate}/>
        </>
      )}
    </div>
  )
}

export default App
