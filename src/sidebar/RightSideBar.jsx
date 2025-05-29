import React from 'react'

// const fonts = ['Arial', 'Georgia', 'Roboto', 'Poppins']
const sectionList = ['education', 'experience', 'skills', 'projects', 'certificates', 'achievements', 'objective']

const RightSidebar = ({
  fontFamily,
  setFontFamily,
  primaryColor,
  setPrimaryColor,
  spacing,
  setSpacing,
  visibleSections,
  setVisibleSections,
  zoom,
  setZoom,
  customSections = [],    
  setCustomSections  
}) => {
  
  const toggleSection = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="p-4 pr-0 h-full w-full space-y-6">
      

      <div>
        <h3 className="font-semibold mb-2">Primary Color</h3>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="w-full h-10 p-1 border rounded"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Spacing</h3>
        <input
          type="range"
          min="0.8"
          max="2"
          step="0.1"
          value={spacing}
          onChange={(e) => setSpacing(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-500">Current: {spacing}x</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Visible Sections</h3>
        <div className="space-y-1">
          {sectionList.map(section => (
            <label key={section} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={visibleSections[section]}
                onChange={() => toggleSection(section)}
              />
              <span className="capitalize">{section}</span>
            </label>
          ))}

            {/* Render custom sections */}
  {customSections.map(({ id, title }) => (
  <label key={id} className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={visibleSections[id] ?? false}
      onChange={() => toggleSection(id)}
    />
    <span>{title}</span>
  </label>
))}

        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Zoom Preview</h3>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-500">Current zoom: {zoom}x</p>
      </div>
    </div>
  )
}

export default RightSidebar
