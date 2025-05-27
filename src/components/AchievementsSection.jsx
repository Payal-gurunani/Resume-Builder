import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function AchievementsSection({ resumeData, setResumeData, onNavigate }) {
  const [achievement, setAchievement] = useState('');

  const handleAdd = () => {
    if (achievement.trim() === '') return;
    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, achievement.trim()],
    });
    setAchievement('');
  };

  const handleRemove = (index) => {
    const updatedAchievements = [...resumeData.achievements];
    updatedAchievements.splice(index, 1);
    setResumeData({ ...resumeData, achievements: updatedAchievements });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button variant="outlined" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <ul>
        {resumeData.achievements.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item}
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemove(index)}
              aria-label="Remove achievement"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>

     
    </Box>
  );
}
