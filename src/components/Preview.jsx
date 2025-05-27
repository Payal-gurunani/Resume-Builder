import React, { useState, useEffect } from 'react';
import TemplateOne from './templets/TemplateOne';
import TemplateTwo from './templets/TemplateTwo';

function Preview({ resumeData ,selectedTemplate }) {
 

  if (!resumeData) return <p>Loading resume data...</p>;

  return (
    <div>
      {selectedTemplate === 'templateOne' && <TemplateOne resumeData={resumeData} />}
      {selectedTemplate === 'templateTwo' && <TemplateTwo resumeData={resumeData} />}
    </div>
  );
}

export default Preview;