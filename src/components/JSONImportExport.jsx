import React from 'react';

export function ExportJsonButton({ resumeData }) {
  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumeData.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} style={{ marginRight: 8 }}>
      Export JSON
    </button>
  );
}

export function ImportJsonInput({ setResumeData }) {
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setResumeData(importedData);
        alert('Resume data imported successfully!');
      } catch (error) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <label style={{ cursor: 'pointer', marginLeft: 8 }}>
      Import JSON
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </label>
  );
}
