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

export default function TemplateOne({ resumeData }) {
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

  return (
    <>
      {/* Print Button (hidden when printing) */}
      <Box textAlign="center" mb={2} sx={{ '@media print': { display: 'none' } }}>
        <Button variant="outlined" onClick={() => window.print()}>
          Print Resume
        </Button>
      </Box>

      <Box
        maxWidth="lg"
        mx="auto"
        my={5}
        boxShadow={4}
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        sx={{
          '@media print': {
            boxShadow: 'none',
            margin: 0,
            maxWidth: '100%',
            flexDirection: 'column',
            backgroundColor: '#fff',
            color: '#000',
            padding: 0,
          },
        }}
      >
        {/* LEFT COLUMN */}
        <Box
          width={{ xs: '100%', md: '35%' }}
          bgcolor="background.paper"
          p={3}
          sx={{
            '@media print': {
              bgcolor: 'transparent',
              padding: 0,
              marginBottom: 2,
              border: 'none',
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
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
                    rel="noopener noreferrer"
                    target="_blank"
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
                    rel="noopener noreferrer"
                    target="_blank"
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

          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <Box key={i} mb={2}>
              <Typography variant="subtitle2" fontWeight="bold">
                {edu.institution}
              </Typography>
              <Typography variant="body2">{edu.degree}</Typography>
              <Typography variant="caption" color="text.secondary">
                {edu.year}
              </Typography>
            </Box>
          ))}

          {certificates.length > 0 && (
            <>
              <SectionTitle>Certificates</SectionTitle>
              <List dense>
                {certificates.map((cert, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={`${cert.name} — ${cert.issuer}`} secondary={cert.year} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {skills.length > 0 && (
            <>
              <SectionTitle>Skills</SectionTitle>
              <Typography variant="body2">{skills.join(', ')}</Typography>
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
              marginBottom: 2,
              border: 'none',
            },
          }}
        >
          {objective && (
            <>
              <SectionTitle>Summary</SectionTitle>
              <Typography variant="body2" paragraph>
                {objective}
              </Typography>
            </>
          )}

          {experience.length > 0 && (
            <>
              <SectionTitle>Experience</SectionTitle>
              {experience.map((exp, i) => (
                <Box key={i} mb={3}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {exp.role} @ {exp.company}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {exp.start} – {exp.end}
                  </Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Box>
              ))}
            </>
          )}

          {projects.length > 0 && (
            <>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((proj, i) => (
                <Box key={i} mb={2}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {proj.title}
                  </Typography>
                  <Typography variant="body2">{proj.description}</Typography>
                </Box>
              ))}
            </>
          )}

          {achievements.length > 0 && (
            <>
              <SectionTitle>Achievements</SectionTitle>
              <List dense>
                {achievements.map((ach, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={`${ach.title} (${ach.year})`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

// Reusable MUI-style section title
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

// Reusable contact line with icon
function ContactLine({ icon, text }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}
