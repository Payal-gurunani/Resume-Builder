import { Box, TextField, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';

export default function EducationSection({ resumeData, setResumeData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (index, e) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [e.target.name]: e.target.value,
    };
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { degree: '', school: '', startYear: '', endYear: '', description: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({ ...resumeData, education: updatedEducation });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Education Submitted:', resumeData.education);
    setIsSubmitted(true); // mark as submitted
  };

  // Helper: check if any education field is filled
  const hasFilledEducation = () => {
    return resumeData.education.some(edu =>
      edu.degree.trim() !== '' ||
      edu.school.trim() !== '' ||
      edu.startYear.trim() !== '' ||
      edu.endYear.trim() !== '' ||
      edu.description.trim() !== ''
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      

      {resumeData.education.map((edu, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <TextField
            label="Degree"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange(index, e)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="School/University"
            name="school"
            value={edu.school}
            onChange={(e) => handleChange(index, e)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
                       <TextField
              label="Start Year"
              name="startYear"
              type="number"
              value={edu.startYear}
              onChange={(e) => handleChange(index, e)}
              variant="outlined"
              size="small"
              inputProps={{ min: 1900, max: new Date().getFullYear() + 10 }}
              fullWidth
            />
            <TextField
              label="End Year"
              name="endYear"
              type="number"
              value={edu.endYear}
              onChange={(e) => handleChange(index, e)}
              variant="outlined"
              size="small"
              inputProps={{ min: 1900, max: new Date().getFullYear() + 10 }}
              fullWidth
            />
            <TextField
              label="Percentage / CGPA"
              name="cgpa"
              value={edu.cgpa}
              onChange={(e) => handleChange(index, e)}
              variant="outlined"
              size="small"
              fullWidth
            />

          </Box>
          <TextField
            label="Description"
            name="description"
            value={edu.description}
            onChange={(e) => handleChange(index, e)}
            variant="outlined"
            size="small"
            fullWidth
            multiline
          />
          <Button variant="outlined" color="error" onClick={() => removeEducation(index)}>
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={addEducation} sx={{ mb: 2 }}>
        Add Education
      </Button>

      {/* <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2, alignItems: 'center' }}>
        {hasFilledEducation() && !isSubmitted && (
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
        )} */}
      {/* </Box> */}
    </Box>
  );
}
