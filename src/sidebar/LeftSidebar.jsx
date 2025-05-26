import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonalInfo from '../components/PersonalInfo.jsx'
import EducationSection from '../components/EducationSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx';
import ProjectsSection from '../components/ProjectSection.jsx'
import Objective from '../components/Objective.jsx';
import CertificatesSection from '../components/Certificate.jsx';
import AchievementsSection from '../components/AchievementsSection.jsx';

const LeftSidebar = ({ resumeData, setResumeData }) => {
    const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default on desktop
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
  
   <>
      {/* Toggle Button (Always visible on mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-[999]">
        <button onClick={toggleSidebar} className="text-gray-700 bg-white p-2 rounded shadow">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>



    <div
  className={`w-80 shadow-md h-screen fixed left-0 z-50 transition-transform top-16 duration-300 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block 
    overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400`}
>


      <Accordion  >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Personal Information
        </AccordionSummary>
        <AccordionDetails >
          <PersonalInfo resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Education
        </AccordionSummary>
        <AccordionDetails>
          <EducationSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Experience
        </AccordionSummary>
        <AccordionDetails>
          <ExperienceSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Skills
        </AccordionSummary>
        <AccordionDetails>
          <SkillsSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Projects
        </AccordionSummary>
        <AccordionDetails>
          <ProjectsSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Objective
        </AccordionSummary>
        <AccordionDetails>
          <Objective resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Certificates
        </AccordionSummary>
        <AccordionDetails>
          <CertificatesSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Achievements
        </AccordionSummary>
        <AccordionDetails>
          <AchievementsSection resumeData={resumeData} setResumeData={setResumeData} />
        </AccordionDetails>
      </Accordion>
    </div>
    </>
  );
};

export default LeftSidebar;
