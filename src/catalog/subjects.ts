import type { SubjectId } from "./types";

export const subjects: {
  id: SubjectId;
  label: string;
  blurb: string;
}[] = [
  { id: "html", label: "HTML", blurb: "Tags, structure, and the document." },
  { id: "css", label: "CSS", blurb: "Boxes, layout, and paint." },
  { id: "javascript", label: "JavaScript", blurb: "Behavior in the browser." },
  { id: "react", label: "React", blurb: "Components and state." },
  { id: "kotlin", label: "Kotlin", blurb: "Language basics for Android." },
  { id: "compose", label: "Compose", blurb: "UI built from functions." },
  { id: "xml", label: "XML", blurb: "Layouts and resources." },
];

export function subjectById(id: SubjectId) {
  const found = subjects.find((subject) => subject.id === id);
  if (!found) throw new Error(`Unknown subject ${id}`);
  return found;
}
