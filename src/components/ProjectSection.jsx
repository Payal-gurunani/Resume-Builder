import { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProjectsSection({ resumeData, setResumeData, onNavigate }) {
  const [project, setProject] = useState({ title: '', description: '', link: '' });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (project.title.trim()) {
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, project],
      });
      setProject({ title: '', description: '', link: '' });
    }
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: updatedProjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Projects Submitted!');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          label="Project Title"
          name="title"
          value={project.title}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={project.description}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Project Link (optional)"
          name="link"
          value={project.link}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleAddProject}>
          Add Project
        </Button>
      </Box>

      <List>
        {resumeData.projects.length === 0 && <Typography color="text.secondary">No projects added yet.</Typography>}
        {resumeData.projects.map((proj, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProject(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={proj.title}
              secondary={
                <>
                  {proj.description}
                  {proj.link && <><br /><a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a></>}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('skills')}>
          Previous
        </Button>

        <Button variant="contained" color="secondary" type="submit">
          Submit Projects
        </Button>

        <Button variant="outlined" color="primary" type="button" onClick={() => onNavigate('objective')} >
          Next
        </Button>
      </Box>
    </Box>
  );
}
