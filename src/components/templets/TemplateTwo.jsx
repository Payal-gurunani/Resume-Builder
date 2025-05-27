import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';


export default function TemplateTwo({
  resumeData,
  fontFamily,
  primaryColor,
  spacing,
  visibleSections = {
    education: true,
  experience: true,
  projects: true,
  certificates: true,
  achievements: true,
  skills: true,
  summary: true,

},
  zoom,
}) {
 const {
  personalInfo = {},
  objective = '',
  education = [],
  experience = [],
  skills = [],
  projects = [],
  certificates = [],
  achievements = [],
} = resumeData;
  const resumeRef = useRef();
  const sectionTitleStyles = {
    color: '#B0B0B0',
  };

  // Print handler opens a new window with inline styles and resume content
  const handlePrint = () => {
    const input = resumeRef.current;
    if (!input) return;

    const printWindow = window.open('', '_blank');

    // Gather CSS styles as text
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('');
        } catch {
          return '';
        }
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            ${styles}
            body {
              background: white !important;
              color: black !important;
              margin: 20px;
            }
            @media print {
              button, [data-hide-print] {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div id="resume-root">${input.innerHTML}</div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  // PDF download using html2pdf.js
  const handleDownloadPdf = () => {
    const element = resumeRef.current;
    if (!element) return;

    // Wrap resume content in a styled div for better formatting in PDF
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'white';
    wrapper.style.color = 'black';
    wrapper.style.padding = '20px 30px';
    wrapper.style.fontFamily = fontFamily || 'Arial, sans-serif';
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.width = 'calc(210mm - 40px)'; // A4 minus padding
    wrapper.style.maxWidth = '800px';
    wrapper.style.margin = 'auto';

    // Add style to avoid page breaks inside headers/paragraphs
    const style = document.createElement('style');
    style.textContent = `
      h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
      p, li, div { page-break-inside: avoid; }
      .avoid-break { page-break-inside: avoid; }
    `;
    wrapper.appendChild(style);

    // Heading for PDF
    const heading = document.createElement('h1');
    heading.textContent = 'RESUME';
    heading.style.textAlign = 'center';
    heading.style.marginBottom = '15px';
    heading.style.color = 'black';
    wrapper.appendChild(heading);

    // Clone the resume content and force colors
    const clone = element.cloneNode(true);
    clone.style.color = 'black';
    clone.style.backgroundColor = 'white';
    clone.style.padding = '0';

    const enforceColors = (node) => {
      if (node.nodeType === 1) {
        node.style.color = 'black';
        node.style.backgroundColor = 'white';
        for (const child of node.children) {
          enforceColors(child);
        }
      }
    };
    enforceColors(clone);

    wrapper.appendChild(clone);

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${personalInfo.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#fff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    html2pdf()
      .set(options)
      .from(wrapper)
      .save();
  };

  return (
    <>
      {/* Action Buttons */}
      <Box
        textAlign="center"
        mb={2}
        sx={{
          '@media print': { display: 'none' },
        }}
      >
        <Button variant="outlined" onClick={handlePrint} sx={{ mr: 2 }}>
          Print Resume
        </Button>
        <Button variant="contained" onClick={handleDownloadPdf}>
          Download PDF
        </Button>
      </Box>

      {/* Resume Content */}
      <Box
        ref={resumeRef}
        sx={{
          fontFamily,
          px: 4 * spacing,
          py: 5 * spacing,
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'background.default',
          color: 'text.primary',
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease',
          '@media print': {
            bgcolor: '#fff',
            color: '#000',
            px: 0,
            py: 0,
            maxWidth: '100%',
            boxShadow: 'none',
            margin: 0,
            transform: 'none',
          },
        }}
      >
        {/* HEADER */}
        <Box textAlign="center" pb={2} borderBottom={2} borderColor="divider">
          <Typography variant="h4" fontWeight="bold"  sx={sectionTitleStyles}>
            {personalInfo.name}
          </Typography>
          <Typography variant="body2" fontStyle="italic">
            {personalInfo.email} | {personalInfo.phone}
          </Typography>
          <Typography variant="body2">{personalInfo.address}</Typography>
          {(personalInfo.github || personalInfo.linkedin) && (
            <Typography variant="body2">
              {personalInfo.github && (
                <Link
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    '@media print': {
                      color: 'black',
                      textDecoration: 'none',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  GitHub
                </Link>
              )}
              {personalInfo.github && personalInfo.linkedin && ' | '}
              {personalInfo.linkedin && (
                <Link
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    '@media print': {
                      color: 'black',
                      textDecoration: 'none',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  LinkedIn
                </Link>
              )}
            </Typography>
          )}
        </Box>

        {/* Summary */}
         {visibleSections.objective && objective && (
          <Section title="objective" titleSx={sectionTitleStyles}>
            <Typography variant="body2">{objective}</Typography>
          </Section>
        )}
        {console.log("Summary content:", objective)}
{console.log("Is summary section visible?", visibleSections.objective)}

        
        {/* EDUCATION */}
       {visibleSections.education && education.length > 0 && (
          <Section title="EDUCATION" titleSx={sectionTitleStyles}>
            {education.map((edu, i) => (
              <Box key={i} mb={2 * spacing}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {edu.school}
                </Typography>
                <Typography variant="body2">{edu.degree}</Typography>
                <Typography variant="caption">
                  {edu.startYear} – {edu.endYear} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Section>
        )}

        {/* EXPERIENCE */}
        {visibleSections.experience && experience.length > 0 && (
          <Section title="EXPERIENCE" titleSx={sectionTitleStyles}>
            {experience.map((exp, i) => (
              <Box key={i} mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {exp.company}, {exp.location}
                </Typography>
                <Typography variant="body2" fontStyle="italic">
                  {exp.role}
                </Typography>
                <Typography variant="caption">
                  {exp.start} – {exp.end}
                </Typography>
                <List dense sx={{ pl: 2 }}>
                  {exp.description?.split('\n').map((line, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemText primary={`• ${line}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Section>
        )}

        {/* SKILLS */}
         {visibleSections.skills && skills.length > 0 && (
          <Section title="KEY SKILLS" subtitle="(not limited to two)" titleSx={sectionTitleStyles}>
            <Typography variant="body2">{skills.join(', ')}</Typography>
          </Section>
        )}

        {/* PROJECTS */}
         {visibleSections.projects && projects.length > 0 && (
          <Section title="PROJECTS" titleSx={sectionTitleStyles}>
            {projects.map((proj, i) => (
              <Box key={i} mb={1}>
                <Typography variant="body2">
                  <strong>{proj.title}</strong>: {proj.description}{' '}
                  {proj.link && (
                    <Link
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        ml: 1,
                        '@media print': {
                          color: 'black',
                          textDecoration: 'none',
                          pointerEvents: 'none',
                        },
                      }}
                    >
                      [Link]
                    </Link>
                  )}
                </Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* CERTIFICATES */}
        {visibleSections.certificates && certificates.length > 0 && (
          <Section title="CERTIFICATES" titleSx={sectionTitleStyles}>
            <List dense>
              {certificates.map((cert, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText
                    primary={
                      <>
                        {cert.title} - {cert.issuer}
                        {cert.date && ` (${cert.date})`}
                        {cert.link && (
                          <Link
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{
                              ml: 1,
                              '@media print': {
                                color: 'black',
                                textDecoration: 'none',
                                pointerEvents: 'none',
                              },
                            }}
                          >
                            [Link]
                          </Link>
                        )}
                      </>
                    }
                    secondary={cert.description || ''}
                  />
                </ListItem>
              ))}
            </List>
          </Section>
        )}

           {/* ACHIEVEMENTS */}
        {visibleSections.achievements && achievements.length > 0 && (
          <Section title="ACHIEVEMENTS" titleSx={sectionTitleStyles}>
            <List dense>
              {achievements.map((ach, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText primary={`${ach.title} (${ach.year})`} />
                </ListItem>
              ))}
            </List>
          </Section>
        )}
      </Box>
    </>
  );
}

// Reusable Section component for styling and layout
function Section({ title, subtitle, subtitleColor = 'text.secondary', children, titleSx }) {
  return (
    <Box mt={4} pb={1} borderBottom={1} borderColor="divider">
      <Typography variant="h6" fontWeight="bold" sx={titleSx}>
        {title}{' '}
        {subtitle && (
          <Typography component="span" variant="caption" sx={{ color: subtitleColor }}>
            {subtitle}
          </Typography>
        )}
      </Typography>
      <Box mt={1}>{children}</Box>
    </Box>
  );
}
