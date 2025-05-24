import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function AchievementsSection({ resumeData, setResumeData, onNavigate }) {
  const [achievement, setAchievement] = useState('');

  const handleAdd = () => {
    if (achievement.trim() !== '') {
      setResumeData({
        ...resumeData,
        achievements: [...resumeData.achievements, achievement],
      });
      setAchievement('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Achievements:', resumeData.achievements);
    alert("Achievements saved!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Achievements
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Achievement"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="outlined" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <ul>
        {resumeData.achievements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('certificate')}>
          Previous
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Submit Achievements
        </Button>
        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('preview')}>
          Preview
        </Button>
      </Box>
    </Box>
  );
}
