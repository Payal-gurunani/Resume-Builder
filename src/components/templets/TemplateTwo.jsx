export default function TemplateTwo({ resumeData }) {
  const {
    personalInfo,
    objective,
    education,
    experience,
    skills,
    projects,
    certificates,
    achievements,
    honorsActivities,
    references
  } = resumeData;

  const sectionStyle = {
    marginTop: 20,
    borderBottom: '1px solid #000',
    paddingBottom: 5
  };

  const boldText = {
    fontWeight: 'bold'
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', padding: 20, maxWidth: 800, margin: 'auto', backgroundColor: '#fff', color: '#000' }}>
      {/* HEADER */}
      <header style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 10 }}>
        <h1 style={{ margin: 0 }}>{personalInfo.name }</h1>
        <p style={{ margin: 0, fontStyle: 'italic' }}>{personalInfo.email} | {personalInfo.phone }</p>
        <p>{personalInfo.address }</p>
        {(personalInfo.github || personalInfo.linkedin) && (
          <p>
            {personalInfo.github && <a href={personalInfo.github}>GitHub</a>}
            {personalInfo.github && personalInfo.linkedin && ' | '}
            {personalInfo.linkedin && <a href={personalInfo.linkedin}>LinkedIn</a>}
          </p>
        )}
      </header>

      {/* OBJECTIVE */}
      {objective && (
        <section style={sectionStyle}>
          <h3 style={boldText}>OBJECTIVE</h3>
          <p>{objective}</p>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>EDUCATION</h3>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{edu.institution}</strong>, {edu.location} — {edu.degree}<br />
              <em>{edu.field} | GPA: {edu.gpa } (Round to two decimal points: 3.00/4.00)</em><br />
              <span>Graduation: {edu.year }</span>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>EXPERIENCE <span style={{ color: 'gray', fontSize: 12 }}>(can be paid, unpaid, internship, volunteer, etc.)</span></h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{exp.company}</strong>, {exp.location} — <em>{exp.role}</em><br />
              <span><time>{exp.start}</time> - <time>{exp.end}</time></span>
              <ul>
                {exp.description?.split('\n').map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* HONORS & ACTIVITIES */}
      {honorsActivities?.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>HONORS & ACTIVITIES <span style={{ color: 'goldenrod', fontWeight: 'normal' }}>(Choose one or both)</span></h3>
          {honorsActivities.map((item, i) => (
            <div key={i}>
              <strong>{item.organization}</strong> — {item.title}<br />
              <span>{item.date }</span>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>KEY SKILLS <span style={{ fontSize: 12, color: 'gray' }}>(not limited to two)</span></h3>
          <p>{skills.join(', ')}</p>
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>PROJECTS</h3>
          {projects.map((proj, i) => (
            <p key={i}><strong>{proj.title}</strong>: {proj.description}</p>
          ))}
        </section>
      )}

      {/* CERTIFICATES */}
      {certificates.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>CERTIFICATES</h3>
          <ul>
            {certificates.map((cert, i) => (
              <li key={i}>{cert.name} - {cert.issuer} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={boldText}>ACHIEVEMENTS</h3>
          <ul>
            {achievements.map((ach, i) => (
              <li key={i}>{ach.title} ({ach.year})</li>
            ))}
          </ul>
        </section>
      )}

      {/* REFERENCES */}
      {references && (
        <section style={sectionStyle}>
          <h3 style={boldText}>REFERENCES</h3>
          <p>Available Upon Request</p>
        </section>
      )}
    </div>
  );
}
