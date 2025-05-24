
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

export default function HomePage({ onNavigate }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Resume Builder
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={4}>
        Create, customize, and export your professional resume easily.
      </Typography>

      {/* Create Resume Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mb: 4 }}
        onClick={() => onNavigate('personal')}
      >
        Create Resume
      </Button>

      
    </Box>
  );
}
