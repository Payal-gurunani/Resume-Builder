import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

const Objective = ({ resumeData, setResumeData, onNavigate }) => {
  const [objective, setObjective] = useState(resumeData.objective || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({ ...resumeData, objective });
    console.log('Objective:', objective);
    alert('Objective saved!');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Objective
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('project')}>
          Previous
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Submit Objective
        </Button>
        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('certificate')}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Objective;
