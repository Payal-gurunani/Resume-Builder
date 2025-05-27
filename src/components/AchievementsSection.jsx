import { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AchievementsSection({ resumeData, setResumeData }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleAdd = () => {
    if (title.trim() === '') return; // require title at least
    const newAchievement = { title: title.trim(), year: year.trim() };
    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, newAchievement],
    });
    setTitle('');
    setYear('');
  };

  const handleRemove = (index) => {
    const updated = [...resumeData.achievements];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, achievements: updated });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
     

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 100 }}
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

      <List dense>
        {resumeData.achievements.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                color="error"
                onClick={() => handleRemove(index)}
                aria-label="Remove achievement"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          >
            <ListItemText primary={`${item.title} (${item.year})`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
