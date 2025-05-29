import React, { useState, useEffect } from 'react';
import TemplateOne from './templets/TemplateOne';
import TemplateTwo from './templets/TemplateTwo';

function Preview({
  resumeData,
  selectedTemplate,
  fontFamily = '"Poppins", sans-serif',
  primaryColor,
  spacing,
  zoom,
  visibleSections,
  customSections
}) {
  if (!resumeData) return <p>Loading resume data...</p>;

  return (
    <div>
      {selectedTemplate === 'templateOne' && (
        <TemplateOne
          resumeData={resumeData}
          fontFamily={fontFamily}
          primaryColor={primaryColor}
          spacing={spacing}
          zoom={zoom}
          visibleSections={visibleSections}
            customSections={customSections}

        />
      )}
      {selectedTemplate === 'templateTwo' && (
        <TemplateTwo
          resumeData={resumeData}
          fontFamily={fontFamily}
          primaryColor={primaryColor}
          spacing={spacing}
          zoom={zoom}
          visibleSections={visibleSections}
          customSections={customSections}
        />
      )}
    </div>
  );
}


export default Preview;