import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id="template-label">Choose Template</InputLabel>
      <Select
        labelId="template-label"
        id="template-select"
        value={selectedTemplate}
        label="Choose Template"
        onChange={(e) => onSelect(e.target.value)}
      >
        <MenuItem value="templateOne">Template One</MenuItem>
        <MenuItem value="templateTwo">Template Two</MenuItem>
      </Select>
    </FormControl>
  )
}
