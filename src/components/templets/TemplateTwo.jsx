import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function TemplateTwo({ resumeData }) {
  const {
    personalInfo,
    objective,
    education,
    experience,
    skills,
    projects,
    certificates,
    achievements,
    honorsActivities,
    references,
  } = resumeData;

  const resumeRef = useRef();

 const handleDownloadPdf = () => {
  const input = resumeRef.current;
  if (!input) return;

  // Force white background and black text
  input.style.setProperty('background-color', '#ffffff', 'important');
  input.style.setProperty('color', '#000000', 'important');

  // Force all child elements to white bg and black text
  const allElements = input.querySelectorAll('*');
  allElements.forEach((el) => {
    el.style.setProperty('background-color', '#ffffff', 'important');
    el.style.setProperty('color', '#000000', 'important');
  });

  html2canvas(input, { scale: 2 }).then((canvas) => {
    // Revert changes after capture
    input.style.removeProperty('background-color');
    input.style.removeProperty('color');

    allElements.forEach((el) => {
      el.style.removeProperty('background-color');
      el.style.removeProperty('color');
    });

    // Generate PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${personalInfo.name || 'resume'}.pdf`);
  });
};



  return (
    <>
      {/* Buttons */}
      <Box textAlign="center" mb={2} sx={{ '@media print': { display: 'none' } }}>
        <Button variant="outlined" onClick={() => window.print()} sx={{ mr: 2 }}>
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
          fontFamily: 'Georgia, serif',
          px: 4,
          py: 5,
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'background.default',
          color: 'text.primary',
          '@media print': {
            bgcolor: '#fff',
            color: '#000',
            px: 0,
            py: 0,
            maxWidth: '100%',
            boxShadow: 'none',
            margin: 0,
          },
        }}
      >
        {/* HEADER */}
        <Box textAlign="center" pb={2} borderBottom={2} borderColor="divider">
          <Typography variant="h4" fontWeight="bold">
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

        {/* OBJECTIVE */}
        {objective && (
          <Section title="OBJECTIVE">
            <Typography variant="body2">{objective}</Typography>
          </Section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <Section title="EDUCATION">
            {education.map((edu, i) => (
              <Box key={i} mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {edu.institution}
                </Typography>
                <Typography variant="body2">
                  {edu.location} — {edu.degree}
                </Typography>
                <Typography variant="caption" fontStyle="italic">
                  {edu.field} | GPA: {Number(edu.gpa).toFixed(2)} (3.00/4.00)
                </Typography>
                <Typography variant="caption" display="block">
                  Graduation: {edu.year}
                </Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <Section
            title="EXPERIENCE"
            subtitle="(can be paid, unpaid, internship, volunteer, etc.)"
          >
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

        {/* HONORS & ACTIVITIES */}
        {honorsActivities?.length > 0 && (
          <Section
            title="HONORS & ACTIVITIES"
            subtitle="(Choose one or both)"
            subtitleColor="warning.main"
          >
            {honorsActivities.map((item, i) => (
              <Box key={i} mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  {item.organization}
                </Typography>
                <Typography variant="body2">
                  {item.title} — {item.date}
                </Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <Section title="KEY SKILLS" subtitle="(not limited to two)">
            <Typography variant="body2">{skills.join(', ')}</Typography>
          </Section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <Section title="PROJECTS">
            {projects.map((proj, i) => (
              <Typography key={i} variant="body2" mb={1}>
                <strong>{proj.title}</strong>: {proj.description}
              </Typography>
            ))}
          </Section>
        )}

        {/* CERTIFICATES */}
        {certificates.length > 0 && (
          <Section title="CERTIFICATES">
            <List dense>
              {certificates.map((cert, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText
                    primary={`${cert.name} - ${cert.issuer} (${cert.year})`}
                  />
                </ListItem>
              ))}
            </List>
          </Section>
        )}

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <Section title="ACHIEVEMENTS">
            <List dense>
              {achievements.map((ach, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText primary={`${ach.title} (${ach.year})`} />
                </ListItem>
              ))}
            </List>
          </Section>
        )}

        {/* REFERENCES */}
        {references && (
          <Section title="REFERENCES">
            <Typography variant="body2">Available Upon Request</Typography>
          </Section>
        )}
      </Box>
    </>
  );
}

// Reusable Section Component
function Section({ title, subtitle, subtitleColor = 'text.secondary', children }) {
  return (
    <Box mt={4} pb={1} borderBottom={1} borderColor="divider">
      <Typography variant="h6" fontWeight="bold">
        {title}{' '}
        {subtitle && (
          <Typography
            component="span"
            variant="caption"
            sx={{ color: subtitleColor }}
          >
            {subtitle}
          </Typography>
        )}
      </Typography>
      <Box mt={1}>{children}</Box>
    </Box>
  );
}
