// components/ExperienceSection.jsx
import { Box, TextField, Typography, Button } from '@mui/material';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Experience Submitted:', resumeData.experience);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, mb: 2 }}
        >
            <Typography variant="h6" gutterBottom>
                Experience
            </Typography>

            {resumeData.experience.map((exp, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <TextField
                        label="Job Title"
                        name="jobTitle"
                        value={exp.jobTitle}
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            label="Start Year"
                            name="startYear"
                            value={exp.startYear}
                            onChange={(e) => handleChange(index, e)}
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="End Year"
                            name="endYear"
                            value={exp.endYear}
                            onChange={(e) => handleChange(index, e)}
                            variant="outlined"
                            size="small"
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
                    <Button variant="outlined" color="error" onClick={() => removeExperience(index)}>
                        Remove
                    </Button>
                </Box>
            ))}
             <Button variant="contained" color="primary" onClick={addExperience}>
                    Add Experience
                </Button>
            <Box sx={{ display: 'flex', gap: 2 ,justifyContent:'center', mt:2 }}>
               
                <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => onNavigate('education')}
                    sx={{ mt: 1, pl: 2, }}
                >
                    Previous
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                    Submit Experience
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => onNavigate('skills')}
                    sx={{ mt: 1 }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
