import React, { useState, useEffect } from 'react';
import TemplateOne from './templets/TemplateOne';
import TemplateTwo from './templets/TemplateTwo';

function Preview({ selectedTemplate }) {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Load data from localStorage when component mounts
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  if (!resumeData) return <p>Loading resume data...</p>;

  return (
    <div>
      {selectedTemplate === 'templateOne' && <TemplateOne resumeData={resumeData} />}
      {selectedTemplate === 'templateTwo' && <TemplateTwo resumeData={resumeData} />}
    </div>
  );
}

export default Preview;
