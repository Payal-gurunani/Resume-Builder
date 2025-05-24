import { Box, TextField, Typography, Button } from '@mui/material';

export default function EducationSection({ resumeData, setResumeData ,onNavigate}) {
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
      education: [...resumeData.education, { degree: '', school: '', startYear: '', endYear: '', description: '' }],
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

    // Later: Add toast or alert for confirmation
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>

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
              value={edu.startYear}
              onChange={(e) => handleChange(index, e)}
              variant="outlined"
              size="small"
            />
            <TextField
              label="End Year"
              name="endYear"
              value={edu.endYear}
              onChange={(e) => handleChange(index, e)}
              variant="outlined"
              size="small"
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
      <Button variant="contained" color="primary" onClick={addEducation}>
          Add Education
        </Button>
      <Box sx={{ display: 'flex', gap: 2 , justifyContent:'center', mt:2}}>
        
         <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => onNavigate('personal')}
          sx={{ mt: 1 , pl:2 ,  }}
        >
          Previous
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Submit Education
        </Button>
          <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => onNavigate('experience')}
          sx={{ mt: 1 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
