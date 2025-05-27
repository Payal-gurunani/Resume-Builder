import { useState } from 'react';
import { Box, TextField, Button, Chip, Typography } from '@mui/material';

export default function SkillsSection({ resumeData, setResumeData, onNavigate }) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !resumeData.skills.includes(trimmedSkill)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, trimmedSkill],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
      

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="Add a skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleAddSkill}>
          Add
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {resumeData.skills.length === 0 ? (
          <Typography color="text.secondary">No skills added yet.</Typography>
        ) : (
          resumeData.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              color="primary"
            />
          ))
        )}
      </Box>

      
    </Box>
  );
}
