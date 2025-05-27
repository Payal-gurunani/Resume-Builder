import { Box, TextField, Button, Typography } from '@mui/material';

const Objective = ({ resumeData, setResumeData, onNavigate }) => {
  const handleChange = (e) => {
    setResumeData({ ...resumeData, objective: e.target.value });
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        mb: 2,
      }}
    >
      

      <TextField
        label="Objective"
        value={resumeData.objective || ''}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={3}
        sx={{ mb: 2 }}
      />

      
    </Box>
  );
};

export default Objective;
