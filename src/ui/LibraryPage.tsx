import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { episodesFor } from "../catalog/episodes";
import { subjectById, subjects } from "../catalog/subjects";
import { getTemplate, templates } from "../catalog/templates";
import { formatDuration, posterFrame, totalFrames } from "../catalog/time";
import { loadedFonts } from "../remotion/fonts";
import { LessonPlayer } from "./LessonPlayer";

export function LibraryPage() {
  const filled = subjects.filter((subject) => episodesFor(subject.id).length > 0);
  const upcoming = subjects.filter((subject) => episodesFor(subject.id).length === 0);

  return (
    <div className="wrap">
      <header className="mast">
        <p className="eyebrow">Studio</p>
        <h1>Coding Reels</h1>
        <p className="lede">
          Lessons are saved in this app. Play one here, in the browser, before it becomes an MP4.
          Templates change the colors and the fonts. Subjects are the shelves.
        </p>
      </header>

      <section className="template-row" aria-label="Templates">
        {templates.map((template) => (
          <article key={template.id} className="template-card">
            <span className="swatch" style={{ background: template.accent }} />
            <div>
              <h2 style={{ fontFamily: loadedFonts[template.fonts.display] }}>{template.name}</h2>
              <p>{template.description}</p>
              <p className="quiet">{template.fontLabel}</p>
            </div>
          </article>
        ))}
      </section>

      {filled.map((subject) => {
        const lessons = episodesFor(subject.id);
        return (
          <section key={subject.id} className="shelf" aria-labelledby={`subject-${subject.id}`}>
            <div className="shelf-head">
              <div>
                <h2 id={`subject-${subject.id}`}>{subject.label}</h2>
                <p>{subject.blurb}</p>
              </div>
              {subject.id === "html" ? (
                <Link className="text-link" to="/table/html">
                  Open the element table
                </Link>
              ) : null}
            </div>
            <div className="cards">
              {lessons.map((episode) => {
                const template = getTemplate(episode.templateId);
                if (!template) return null;
                return (
                  <Link
                      key={episode.id}
                      className="card"
                      to={`/lessons/${episode.id}`}
                      style={{ "--accent": template.accent } as CSSProperties}
                    >
                    <div className="frame" style={{ background: template.background }}>
                      <LessonPlayer
                        episode={episode}
                        templateId={template.id}
                        showGuides={false}
                        initialFrame={posterFrame(episode)}
                        controls={false}
                        autoPlay
                        loop
                      />
                    </div>
                    <div className="card-copy">
                      <h3>{episode.title}</h3>
                      <p>{episode.thesis}</p>
                      <p className="quiet">
                        {formatDuration(totalFrames(episode))} · {subjectById(episode.subjectId).label} · {template.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="shelf">
        <h2>Next shelves</h2>
        <p>JavaScript, React, Kotlin, Compose, and XML use the same scenes. An Android lesson saves the green template.</p>
        <ul className="pills">
          {upcoming.map((subject) => (
            <li key={subject.id}>{subject.label}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
