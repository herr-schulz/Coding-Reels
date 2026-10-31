import type { Episode, SubjectId } from "../types";
import { cssBoxModel } from "./css-box-model";
import { htmlTags } from "./html-tags";
import { htmlVoidElements } from "./html-void-elements";

export const episodes: Episode[] = [htmlTags, htmlVoidElements, cssBoxModel];

export function getEpisode(id: string) {
  return episodes.find((episode) => episode.id === id);
}

export function episodesFor(subjectId: SubjectId) {
  return episodes.filter((episode) => episode.subjectId === subjectId);
}
