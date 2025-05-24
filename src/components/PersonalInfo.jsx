import { Box, TextField, Typography, Button } from '@mui/material';

export default function PersonalInfoForm({ resumeData, setResumeData,onNavigate }) {
  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Personal Info Submitted:', resumeData.personalInfo);
    alert("Submitted")
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
           <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => onNavigate('home')}
          sx={{ mt: 1 }}
        >
          Previous
        </Button>
           <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
          <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => onNavigate('education')}
          sx={{ mt: 1 }}
        >
          Next
        </Button>
        </Box>
      </Box>
    </Box>
  );
}
