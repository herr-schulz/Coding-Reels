import type { Beat } from "./types";

export function beatSummary(beat: Beat) {
  switch (beat.type) {
    case "hook":
      return beat.title;
    case "anatomy":
      return `Anatomy of <${beat.tag}>`;
    case "code":
      return beat.title;
    case "tagTable":
      return beat.title;
    case "spotlights":
      return beat.title;
    case "compare":
      return beat.title;
    case "box":
      return beat.title;
    case "end":
      return beat.title;
    default: {
      const exhaustive: never = beat;
      return exhaustive;
    }
  }
}
