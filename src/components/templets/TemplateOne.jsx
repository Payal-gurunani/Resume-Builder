import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";

export default function TemplateOne({ resumeData }) {
  const {
    personalInfo,
    objective,
    education,
    experience,
    skills,
    projects,
    certificates,
    achievements,
  } = resumeData;

  return (
    <div className="flex max-w-5xl mx-auto my-10 font-sans bg-white shadow-lg print:shadow-none">
      {/* LEFT COLUMN */}
      <div className="w-1/3 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold tracking-widest uppercase">{personalInfo.name}</h1>
        <p className="text-gray-600 -mt-2">{personalInfo.title || "STUDENT"}</p>
        <hr className="my-4" />

        {/* Contact */}
        <SectionTitle>Contact</SectionTitle>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2"><FaPhone /> {personalInfo.phone}</p>
          <p className="flex items-center gap-2"><FaEnvelope /> {personalInfo.email}</p>
          {personalInfo.linkedin && (
            <p className="flex items-center gap-2"><FaLinkedin />
              <a href={personalInfo.linkedin} className="hover:underline" target="_blank" rel="noreferrer">
                {personalInfo.linkedin}
              </a>
            </p>
          )}
          {personalInfo.github && (
            <p className="flex items-center gap-2"><FaGithub />
              <a href={personalInfo.github} className="hover:underline" target="_blank" rel="noreferrer">
                {personalInfo.github}
              </a>
            </p>
          )}
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> {personalInfo.address}</p>
        </div>

        {/* Education */}
        <SectionTitle>Education</SectionTitle>
        {education.map((edu, i) => (
          <div key={i} className="mb-4 text-sm">
            <p className="font-semibold">{edu.institution}</p>
            <p>{edu.degree}</p>
            <p className="text-xs text-gray-600">{edu.year}</p>
          </div>
        ))}

        {/* Certificates */}
        {certificates.length > 0 && (
          <>
            <SectionTitle>Certificates</SectionTitle>
            <ul className="list-disc ml-4 text-sm space-y-1">
              {certificates.map((cert, i) => (
                <li key={i}>{cert.name} — {cert.issuer} ({cert.year})</li>
              ))}
            </ul>
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <SectionTitle>Skills</SectionTitle>
            <p className="text-sm">{skills.join(", ")}</p>
          </>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-2/3 p-8">
        {/* Objective */}
        {objective && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm mb-6">{objective}</p>
          </>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <div key={i} className="mb-6 text-sm">
                <p className="font-semibold">{exp.role} @ {exp.company}</p>
                <p className="italic text-gray-500">{exp.start} – {exp.end}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4 text-sm">
                <p className="font-semibold">{proj.title}</p>
                <p>{proj.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <>
            <SectionTitle>Achievements</SectionTitle>
            <ul className="list-disc ml-4 text-sm space-y-1">
              {achievements.map((ach, i) => (
                <li key={i}>{ach.title} ({ach.year})</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="uppercase text-xs font-bold tracking-widest text-gray-700 border-b border-gray-300 pb-1 mt-6 mb-3">
      {children}
    </h3>
  );
}
