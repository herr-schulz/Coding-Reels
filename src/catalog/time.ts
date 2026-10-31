import type { Episode } from "./types";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const sec = (seconds: number) => Math.round(seconds * FPS);

export function totalFrames(episode: Episode) {
  return episode.beats.reduce((sum, beat) => sum + beat.durationInFrames, 0);
}

export function beatStarts(episode: Episode) {
  let cursor = 0;
  return episode.beats.map((beat) => {
    const start = cursor;
    cursor += beat.durationInFrames;
    return start;
  });
}

export function formatDuration(frames: number) {
  const total = Math.round(frames / FPS);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function posterFrame(episode: Episode) {
  const starts = beatStarts(episode);
  const start = starts[episode.posterBeat] ?? 0;
  const beat = episode.beats[episode.posterBeat];
  if (!beat) return 0;
  const settled = Math.min(24, Math.floor(beat.durationInFrames / 3));
  return Math.min(start + settled, Math.max(0, totalFrames(episode) - 1));
}

export function renderCommand(episodeId: string, templateId: string) {
  const props = JSON.stringify({
    episodeId,
    templateId,
    showGuides: false,
  });
  return `pnpm render ${episodeId} out/${episodeId}.mp4 --props='${props}'`;
}
