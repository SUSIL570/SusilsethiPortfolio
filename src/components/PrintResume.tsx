import resumeData from "../data/resume.json";

export default function PrintResume() {
  return (
    <div id="resume-print-content" className="bg-white text-black p-8 font-sans w-[800px] text-sm absolute -left-[9999px] -top-[9999px]">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase mb-1">{resumeData.basics.name}</h1>
        <div className="text-lg mb-2">{resumeData.basics.title}</div>
        <div className="flex justify-center gap-4 text-xs">
          <span>{resumeData.basics.phone}</span>
          <span>{resumeData.basics.email}</span>
          <span>{resumeData.basics.location}</span>
        </div>
        <div className="flex justify-center gap-4 text-xs mt-1">
          {resumeData.basics.links.map((link, i) => (
            <span key={i}>{link}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Summary</h2>
        <p className="text-sm leading-relaxed">{resumeData.basics.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Work Experience</h2>
        {resumeData.experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>{exp.company} | {exp.role}</span>
              <span>{exp.dates}</span>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              {exp.bullets.map((b, j) => (
                <li key={j}>{b.replace(/^- /, '')}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Projects</h2>
        {resumeData.projects.map((proj, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>{proj.title}</span>
              <span>{proj.dates}</span>
            </div>
            <div className="text-xs italic mb-1">Tech: {proj.stack.join(", ")}</div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              {proj.bullets.map((b, j) => (
                <li key={j}>{b.replace(/^- /, '')}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1">
          {/* Education */}
          <div className="mb-4">
            <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="font-bold">{edu.institution}</div>
                <div>{edu.degree}</div>
                <div className="text-xs">{edu.dates}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Certifications</h2>
            <ul className="list-disc pl-5 text-sm">
              {resumeData.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-lg font-bold border-b border-black mb-2 uppercase">Skills</h2>
            {resumeData.skills.map((skillGroup, i) => (
              <div key={i} className="mb-1">
                <span className="font-bold">{skillGroup.group}: </span>
                <span>{skillGroup.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
