import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExperienceSection({ resumeData, setResumeData, onNavigate }) {
  const handleChange = (index, e) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [e.target.name]: e.target.value,
    };
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { jobTitle: '', company: '', startYear: '', endYear: '', description: '' }],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
  

  {resumeData.experience.map((exp, index) => (
    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
      <TextField
        label="Role"
        name="role"
        value={exp.role}
        onChange={(e) => handleChange(index, e)}
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        label="Company"
        name="company"
        value={exp.company}
        onChange={(e) => handleChange(index, e)}
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        label="Location"
        name="location"
        value={exp.location || ''}
        onChange={(e) => handleChange(index, e)}
        variant="outlined"
        size="small"
        fullWidth
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
<TextField
  label="Start Year"
  name="start"
  type="number"
  value={exp.start}
  onChange={(e) => handleChange(index, e)}
  variant="outlined"
  size="small"
  inputProps={{ min: 1900, max: new Date().getFullYear() + 10 }}
/>
<TextField
  label="End Year"
  name="end"
  type="number"
  value={exp.end}
  onChange={(e) => handleChange(index, e)}
  variant="outlined"
  size="small"
  inputProps={{ min: 1900, max: new Date().getFullYear() + 10 }}
/>

      </Box>
      <TextField
        label="Description"
        name="description"
        value={exp.description}
        onChange={(e) => handleChange(index, e)}
        variant="outlined"
        size="small"
        fullWidth
        multiline
      />
      <IconButton color="error" onClick={() => removeExperience(index)} sx={{ alignSelf: 'flex-start' }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  ))}

  <Button variant="contained" color="primary" onClick={addExperience} sx={{ mb: 2 }}>
    Add Experience
  </Button>
</Box>

  );
}
