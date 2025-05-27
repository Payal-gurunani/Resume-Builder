import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleAdd = () => {
    if (!certificate.title || !certificate.issuer) return;

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
  };

  const handleRemove = (index) => {
    const updatedCertificates = [...resumeData.certificates];
    updatedCertificates.splice(index, 1);
    setResumeData({ ...resumeData, certificates: updatedCertificates });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
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
          multiline
        />

        <Button variant="contained" onClick={handleAdd}>
          Add Certificate
        </Button>

        {resumeData.certificates.length > 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Added Certificates:
            </Typography>
            <ul>
              {resumeData.certificates.map((cert, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{cert.title} - {cert.issuer}</span>
                  <IconButton color="error" onClick={() => handleRemove(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
            </ul>
          </Box>
        )}

       
      </Box>
    </Box>
  );
}
