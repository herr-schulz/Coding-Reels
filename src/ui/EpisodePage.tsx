import { useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import type { PlayerRef } from "@remotion/player";
import { beatSummary } from "../catalog/beatSummary";
import { getEpisode } from "../catalog/episodes";
import { subjectById } from "../catalog/subjects";
import { getTemplate, isTemplateId, templates } from "../catalog/templates";
import { beatStarts, formatDuration, renderCommand, totalFrames } from "../catalog/time";
import { loadedFonts } from "../remotion/fonts";
import { LessonPlayer } from "./LessonPlayer";

export function EpisodePage() {
  const { episodeId = "" } = useParams();
  const episode = getEpisode(episodeId);
  const [params, setParams] = useSearchParams();
  const [guides, setGuides] = useState(false);
  const [copied, setCopied] = useState(false);
  const playerRef = useRef<PlayerRef>(null);

  if (!episode) {
    return (
      <div className="wrap">
        <p>That lesson is not in the catalog.</p>
        <Link to="/">Back to the shelf</Link>
      </div>
    );
  }

  const requested = params.get("template");
  const templateId = requested && isTemplateId(requested) ? requested : episode.templateId;
  const template = getTemplate(templateId) ?? getTemplate(episode.templateId);
  if (!template) return null;

  const starts = beatStarts(episode);
  const command = renderCommand(episode.id, template.id);
  const saved = template.id === episode.templateId;

  return (
    <div className="wrap">
      <p className="eyebrow">
        <Link to="/">Shelf</Link>
        <span aria-hidden="true"> / </span>
        {subjectById(episode.subjectId).label}
      </p>
      <div className="lesson">
        <div className="frame lesson-frame" style={{ background: template.background }}>
          <LessonPlayer
            episode={episode}
            templateId={template.id}
            showGuides={guides}
            controls
            autoPlay={false}
            loop={false}
            playerRef={playerRef}
          />
        </div>
        <div className="lesson-side">
          <h1>{episode.title}</h1>
          <p className="lede">{episode.thesis}</p>
          <p className="quiet">
            {formatDuration(totalFrames(episode))} · saved with the {getTemplate(episode.templateId)?.name} template
          </p>

          <div className="switch" role="group" aria-label="Preview template">
            {templates.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === template.id}
                onClick={() => setParams({ template: item.id })}
              >
                <span className="swatch" style={{ background: item.accent }} />
                <span>
                  <strong style={{ fontFamily: loadedFonts[item.fonts.display] }}>{item.name}</strong>
                  <span className="quiet">{item.fontLabel}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="quiet">{saved ? "This is the saved template." : `Previewing ${template.name}. The file still saves ${getTemplate(episode.templateId)?.name}.`}</p>

          <label className="check">
            <input type="checkbox" checked={guides} onChange={(event) => setGuides(event.target.checked)} />
            Show safe-zone guides
          </label>

          <ol className="beats">
            {episode.beats.map((beat, index) => (
              <li key={`${beat.type}-${index}`}>
                <button
                  type="button"
                  onClick={() => {
                    playerRef.current?.seekTo(starts[index] ?? 0);
                    void playerRef.current?.play();
                  }}
                >
                  <span>{index + 1}</span>
                  {beatSummary(beat)}
                </button>
              </li>
            ))}
          </ol>

          <div className="command">
            <p>Render this preview to an MP4</p>
            <code>{command}</code>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(command).then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                });
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
