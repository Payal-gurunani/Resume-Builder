import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField ,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import PersonalInfo from '../components/PersonalInfo.jsx'
import EducationSection from '../components/EducationSection.jsx'
import ExperienceSection from '../components/ExperienceSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx';
import ProjectsSection from '../components/ProjectSection.jsx'
import Objective from '../components/Objective.jsx';
import CertificatesSection from '../components/Certificate.jsx';
import AchievementsSection from '../components/AchievementsSection.jsx';

const LeftSidebar = ({ resumeData, setResumeData,customSections = [], setCustomSections }) => {
    const [isOpen, setIsOpen] = useState(false); 
      const [newSectionName, setNewSectionName] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);
const handleAddCustomSection = () => {
  const title = newSectionName.trim();
  if (!title) return;

  const id = title.toLowerCase().replace(/\s+/g, '_');

  // Avoid duplicate ids
  if (customSections.find(section => section.id === id)) return;

  setCustomSections(prev => [...prev, { id, title }]);

  setResumeData(prev => ({
    ...prev,
    [id]: ''
  }));

  setNewSectionName('');
};



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


      {/* Custom Sections */}
        {customSections.map(({ id, title }) => (
  <Accordion key={id}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {title}
    </AccordionSummary>
    <AccordionDetails>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder={`Enter ${title} content`}
        value={resumeData[id] || ''}
        onChange={(e) =>
          setResumeData(prev => ({
            ...prev,
            [id]: e.target.value
          }))
        }
      />
    </AccordionDetails>
  </Accordion>
))}

        {/* Add Custom Section */}
        <div className="p-4 border-t mt-4">
          <TextField
            label="New Section Name"
            variant="outlined"
            size="small"
            fullWidth
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddCustomSection}
            variant="contained"
            size="small"
            sx={{ marginTop: 1 }}
            fullWidth
          >
            Add Section
          </Button>
        </div>




    </div>
    </>
  );
};

export default LeftSidebar;
