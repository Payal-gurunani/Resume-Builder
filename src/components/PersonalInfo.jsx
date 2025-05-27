import { Box, TextField, Typography, Button } from '@mui/material';
import { useState,useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PersonalInfoForm({ resumeData, setResumeData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localData , setLocalData] = useState(resumeData.personalInfo);

   useEffect(() => {
    setLocalData(resumeData.personalInfo);
  }, [resumeData.personalInfo]);

const handleChange = (e) => {
  setIsSubmitted(false);
  const updatedLocalData = {
    ...localData,
    [e.target.name]: e.target.value,
  };
  setLocalData(updatedLocalData);

  setResumeData(prev => ({
    ...prev,
    personalInfo: updatedLocalData,
  }));
};

  const handleSubmit = (e) => {
    setIsSubmitted(false); 
    e.preventDefault();
 setResumeData(prev => ({
      ...prev,
      personalInfo: localData,
    }));   
      console.log('Updated resumeData:', {...resumeData, personalInfo: localData});

    setIsSubmitted(true)
  };
const hasFilledPersonalInfo = () => {
    const { name, email, phone, address } = localData;
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Full Name"
          name="name"
          value={localData.name || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={localData.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={localData.phone}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Address"
          name="address"
          value={localData.address || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
        <TextField
          label="LinkedIn"
          name="linkedin"
          value={localData.linkedin || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="GitHub"
          name="github"
          value={localData.github || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        {/* <Box sx={{ display: 'flex', gap: 2 }}>
          
         {hasFilledPersonalInfo() && !isSubmitted && (
          <Button variant="contained" color="secondary" type="submit">
            Submit
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
        
        </Box> */}
      </Box>
    </Box>
  );
}
