import { useState } from "react";
import type { ExampleProject } from "../types";

interface ProjectsShowcaseProps {
  topicTitle: string;
  projects: ExampleProject[];
}

function ProjectsShowcase({ topicTitle, projects }: ProjectsShowcaseProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id ?? "");
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  if (!activeProject) {
    return null;
  }

  return (
    <section className="projects container">
      <h3>Örnek Projeler</h3>
      <p className="level-description">
        Seçili konu: {topicTitle}. Bu bölümde eğitim odaklı ama portfolyoda anlatılabilir proje akışları bulunur.
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={activeProjectId === project.id ? "project-card active" : "project-card"}
            onClick={() => {
              setActiveProjectId(project.id);
              setShowSolution(false);
              setCheckedItems({});
            }}
          >
            <span className="project-level">{project.level}</span>
            <h4>{project.title}</h4>
            <p>{project.summary}</p>
            <small>Süre: {project.duration}</small>
          </button>
        ))}
      </div>

      <article className="project-detail">
        <h4>{activeProject.title}</h4>
        <p>{activeProject.summary}</p>
        <p>
          <strong>Proje Konusu:</strong> {activeProject.projectTopic}
        </p>
        <p>
          <strong>Bu Projede Ne İnşa Ediyorsun?</strong> {activeProject.whatYouBuild}
        </p>

        <h5>Kazanımlar</h5>
        <ul>
          {activeProject.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h5>Odak Konular</h5>
        <div className="stack-tags">
          {activeProject.techFocus.map((item) => (
            <span key={item} className="topic-chip">
              {item}
            </span>
          ))}
        </div>

        <h5>Adım Adım Geliştirme Planı</h5>
        <ol>
          {activeProject.steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <h5>Teslim Çıktıları</h5>
        <ul>
          {activeProject.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h5>Başarılı Sayılma Kriterleri</h5>
        <ul>
          {activeProject.acceptanceCriteria.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h5>Manuel Kontrol Listesi</h5>
        <div className="project-checklist">
          {activeProject.validationChecklist.map((item, index) => {
            const key = `${activeProject.id}-${index}`;
            return (
              <label key={key} className="check-item">
                <input
                  type="checkbox"
                  checked={Boolean(checkedItems[key])}
                  onChange={() => setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))}
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>

        <button type="button" className="secondary-btn solution-toggle" onClick={() => setShowSolution((prev) => !prev)}>
          {showSolution ? "Örnek Çözümü Gizle" : "Örnek Çözüm Kodunu Göster"}
        </button>

        {showSolution && (
          <div className="solution-panel">
            <h5>Çözüm Notları</h5>
            <ul>
              {activeProject.solutionNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="code-header">
              <h5>{activeProject.solutionCode.title}</h5>
              <span>
                {activeProject.solutionCode.language.toUpperCase()} | {activeProject.solutionCode.filename ?? "solution.tsx"}
              </span>
            </div>
            <pre>
              <code>{activeProject.solutionCode.code}</code>
            </pre>
          </div>
        )}

        <p className="project-note">
          Not: Bu projeler React öğrenimini güçlendirmek için kademeli zorlukta hazırlanmıştır.
        </p>
      </article>
    </section>
  );
}

export default ProjectsShowcase;
