import { useState } from 'react';

export default function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        Choose Template:{' '}
        <select
          value={selectedTemplate}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="templateOne">Template One</option>
          <option value="templateTwo">Template Two</option>
        </select>
      </label>
    </div>
  );
}
