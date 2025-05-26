import { Box, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PersonalInfoForm({ resumeData, setResumeData,onNavigate }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e) => {
    setIsSubmitted(false); 
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    setIsSubmitted(false); 
    e.preventDefault();
    console.log('Personal Info Submitted:', resumeData.personalInfo);
    setIsSubmitted(true)
  };
const hasFilledPersonalInfo = () => {
    const { name, email, phone, address } = resumeData.personalInfo;
    return (
      name?.trim() !== '' ||
      email?.trim() !== '' ||
      phone?.trim() !== '' ||
      address?.trim() !== ''
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Full Name"
          name="name"
          value={resumeData.personalInfo.name}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={resumeData.personalInfo.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={resumeData.personalInfo.phone}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Address"
          name="address"
          value={resumeData.personalInfo.address || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="LinkedIn"
          name="linkedin"
          value={resumeData.personalInfo.linkedin || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="GitHub"
          name="github"
          value={resumeData.personalInfo.github || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          
         {hasFilledPersonalInfo() && !isSubmitted && (
          <Button variant="contained" color="secondary" type="submit">
            Submit Education
          </Button>
        )}
        
          {isSubmitted && (
          <>
            <CheckCircleIcon color="success" />
            <Typography color="success.main" variant="body2">
              Submitted
            </Typography>
          </>
        )}
        
        </Box>
      </Box>
    </Box>
  );
}
