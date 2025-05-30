import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import {
  Box,
  Typography,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button,
} from '@mui/material';
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGithub,
} from 'react-icons/fa';

export default function TemplateOne({
  resumeData,
  fontFamily = 'Arial',
  primaryColor = '#B0B0B0',
  spacing = 1,
  zoom = 1,
  visibleSections = {
    education: true,
    experience: true,
    projects: true,
    certificates: true,
    achievements: true,
    skills: true,
    objective: true,

  },
  customSections = [],
}) {
  const {
    personalInfo,
    objective,
    education,
    experience,
    skills,
    projects,
    certificates,
    achievements,
  } = resumeData;

  const resumeRef = useRef();
  const sectionStyle = {
    marginBottom: `${spacing}rem`
  }
  const handleDownloadPdf = () => {
    const element = resumeRef.current;
    if (!element) return;

    // Create wrapper div for styling and heading
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'white';
    wrapper.style.color = 'black';
    wrapper.style.padding = '20px';
    wrapper.style.fontFamily = 'Arial, sans-serif';

    // Create and add heading with text content
    const heading = document.createElement('h1');
    heading.textContent = 'RESUME'; // <-- Set heading text here
    heading.style.textAlign = 'center';
    heading.style.marginBottom = '20px';
    heading.style.color = 'black'; // force black color
    wrapper.appendChild(heading);

    // Clone the resume content and append
    const clone = element.cloneNode(true);

    // Force all text in clone to black for PDF, to override external styles
    clone.style.color = 'black';
    // Also override any background colors on the clone or children
    clone.style.backgroundColor = 'white';
    clone.style.width = '100%'; // ← Force full width
    clone.style.display = 'block'; // ← Ensure block layout
    clone.style.boxSizing = 'border-box';
    // Optional: recursively override styles inside clone (if needed)
    const enforceColors = (node) => {
      if (node.nodeType === 1) {
        node.style.color = 'black';
        node.style.backgroundColor = 'white';
        node.style.fontSize = '14px';
        node.style.width = '100%'; // ← Force full width
        node.style.boxSizing = 'border-box';
        for (const child of node.children) {
          enforceColors(child);
        }
      }
    };
    enforceColors(clone);

    wrapper.appendChild(clone);

    const opt = {
      margin: [10, 10, 10, 10], // mm margins
      filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fff',
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    html2pdf()
      .set(opt)
      .from(wrapper)
      .save();
  };


  const handlePrint = () => {
    const input = resumeRef.current;
    if (!input) return;

    const printWindow = window.open('', '_blank');

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('');
        } catch (e) {
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

  return (
    <>
      {/* Buttons */}
      <Box textAlign="center" mb={2} sx={{ '@media print': { display: 'none' } }}>
        <Button variant="outlined" onClick={handlePrint} sx={{ mr: 2 }}>
          Print
        </Button>
        <Button variant="contained" onClick={handleDownloadPdf}>
          Download PDF
        </Button>
      </Box>

      {/* Resume Container */}
      <Box
        ref={resumeRef}
        maxWidth="lg"
        mx="auto"
        my={5}
        boxShadow={4}
        display="flex"
        flexDirection="column"
        sx={{
          fontFamily: fontFamily,
          color: primaryColor,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          '@media print': {
            boxShadow: 'none',
            margin: 0,
            maxWidth: '100%',
            backgroundColor: '#fff',
            color: '#000',
            padding: 0,
            transform: 'none',
          },
        }}
      >


        {/* CONTENT WRAPPER */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={spacing}>
          {/* LEFT COLUMN */}
          <Box
            width={{ xs: '100%', md: '35%' }}
            bgcolor="background.paper"
            p={3}
            sx={{
              '@media print': {
                bgcolor: 'transparent',
                padding: 0,
                border: 'none',
              },
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {personalInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {personalInfo.title}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <SectionTitle>Contact</SectionTitle>
            <Stack spacing={1}>
              <ContactLine icon={<FaPhone />} text={personalInfo.phone} />
              <ContactLine icon={<FaEnvelope />} text={personalInfo.email} />
              {personalInfo.linkedin && (
                <ContactLine
                  icon={<FaLinkedin />}
                  text={
                    <Link
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        '@media print': {
                          color: 'black',
                          textDecoration: 'none',
                          pointerEvents: 'none',
                        },
                      }}
                    >
                      {personalInfo.linkedin}
                    </Link>
                  }
                />
              )}
              {personalInfo.github && (
                <ContactLine
                  icon={<FaGithub />}
                  text={
                    <Link
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        '@media print': {
                          color: 'black',
                          textDecoration: 'none',
                          pointerEvents: 'none',
                        },
                      }}
                    >
                      {personalInfo.github}
                    </Link>
                  }
                />
              )}
              <ContactLine icon={<FaMapMarkerAlt />} text={personalInfo.address} />
            </Stack>

            {visibleSections.education && education.length > 0 && (
              <>
                <SectionTitle>Education</SectionTitle>
                {education.map((edu, i) => (
                  <Box key={i} sx={{ mb:spacing }}>
                    <Typography variant="subtitle">
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {edu.school}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {edu.startYear}-{edu.endYear} {edu.cgpa && `| CGPA/Percentage: ${edu.cgpa}`}
                    </Typography>
                  </Box>
                ))}
              </>
            )}


            {visibleSections.certificates && certificates.length > 0 && (
              <>
                <SectionTitle>Certificates</SectionTitle>
                <List >
                  {certificates.map((cert, i) => (
                    <ListItem key={i} disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <>
                            {cert.title} — {cert.issuer}
                            {cert.link && (
                              <>
                                {' — '}
                                <Link
                                  href={cert.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    '@media print': {
                                      color: 'black',
                                      textDecoration: 'none',
                                      pointerEvents: 'none',
                                    },
                                  }}
                                >
                                  View Certificate
                                </Link>
                              </>
                            )}
                          </>
                        }
                        secondary={cert.date || ''}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>

          {/* RIGHT COLUMN */}
          <Box
            width={{ xs: '100%', md: '65%' }}
            bgcolor="background.default"
            p={3}
            sx={{
              '@media print': {
                bgcolor: 'transparent',
                padding: 0,
                border: 'none',
              },
            }}
          >
            {visibleSections.objective && objective && (
              <>
                <SectionTitle>Summary</SectionTitle>
                <Typography variant="body2" paragraph>
                  {objective}
                </Typography>
              </>
            )}


            {visibleSections.experience && experience.length > 0 && (
              <>
                <SectionTitle>Experience</SectionTitle>
                {experience.map((exp, i) => (
                  <Box key={i} sx={{ mb: spacing }}>
                    <Typography variant="subtitle" fontWeight="bold">
                      {exp.role}
                    </Typography>
                    <Typography variant="body2">
                      {exp.company} - {exp.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {exp.start} – {exp.end}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                ))}
              </>
            )}



            {visibleSections.projects && projects.length > 0 && (
              <>
                <SectionTitle>Projects</SectionTitle>
                {projects.map((proj, i) => (
                  <Box key={i} sx={{ mb: spacing }}>
                    <Typography variant="h6" >
                      {proj.title}
                    </Typography>
                    {proj.link && (
                      <Link
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontWeight: 'bold',
                          wordBreak: 'break-all',
                          display: 'inline-block',
                          mb: 0.5,
                          '@media print': {
                            color: 'black',
                            textDecoration: 'none',
                            pointerEvents: 'none',
                          },
                        }}
                      >
                        {proj.link}
                      </Link>
                    )}
                    <Typography variant="body2">{proj.description}</Typography>
                  </Box>
                ))}
              </>
            )}

            {visibleSections.skills && skills.length > 0 && (
              <>
                <SectionTitle>Skills</SectionTitle>
                <Typography variant="body2">{skills.join(', ')}</Typography>
              </>
            )}

            {visibleSections.achievements && achievements.length > 0 && (
              <>
                <SectionTitle>Achievements</SectionTitle>
                <List dense>
                  {achievements.map((ach, i) => (
                    <ListItem key={i} sx={{ py: 0, mb: spacing }}>
                      <ListItemText primary={`${ach.title} (${ach.year})`} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
             
          {customSections.map(({ id, title }) => {
            // Only render if visible and data exists
            if (!visibleSections[id] || !resumeData[id]) return null;

            // The content is raw text in resumeData[id], you can customize rendering here
            return (
              <Box key={id} sx={{ mb: spacing }}>
                <SectionTitle>{title}</SectionTitle>
                <Typography variant="body2" whiteSpace="pre-line">
                  {resumeData[id]}
                </Typography>
              </Box>
            );
          })}
       

          </Box>
        </Box>
      </Box>
    </>
  );
}

// SectionTitle
function SectionTitle({ children }) {
  return (
    <Typography
      variant="overline"
      fontWeight="bold"
      display="block"
      color="text.secondary"
      gutterBottom
      sx={{ mt: 4 }}
    >
      {children}
    </Typography>
  );
}

// ContactLine
function ContactLine({ icon, text }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}
