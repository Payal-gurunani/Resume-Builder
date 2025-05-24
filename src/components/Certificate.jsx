
import { Box, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';

export default function CertificatesSection({ resumeData, setResumeData, onNavigate }) {
  const [certificate, setCertificate] = useState({
    title: '',
    issuer: '',
    date: '',
    link: '',
    description: '',
  });

  const handleChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!certificate.title || !certificate.issuer) {
      alert('Please fill in the required fields!');
      return;
    }

    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, certificate],
    });

    setCertificate({
      title: '',
      issuer: '',
      date: '',
      link: '',
      description: '',
    });

    alert('Certificate added!');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Certificates
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Certificate Title"
          name="title"
          value={certificate.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Issuer"
          name="issuer"
          value={certificate.issuer}
          onChange={handleChange}
          required
        />
        <TextField
          label="Issue Date"
          name="date"
          value={certificate.date}
          onChange={handleChange}
        />
        <TextField
          label="Certificate Link"
          name="link"
          value={certificate.link}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          value={certificate.description}
          onChange={handleChange}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={() => onNavigate('objective')}>
            Previous
          </Button>
          <Button variant="contained" type="submit">
            Add Certificate
          </Button>
          <Button variant="outlined" onClick={() => onNavigate('achievements')}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
