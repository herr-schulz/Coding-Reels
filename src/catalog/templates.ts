import type { Template, TemplateId } from "./types";

export const templates: Template[] = [
  {
    id: "web",
    name: "Web",
    description: "Blue ink, plain grotesk, for HTML, CSS, and JavaScript.",
    fontLabel: "Inter and JetBrains Mono",
    background: "#07111A",
    surface: "#101A27",
    text: "#F4F7FB",
    muted: "#93A4B8",
    faint: "#243244",
    accent: "#4C8DFF",
    accentSoft: "rgba(76, 141, 255, 0.34)",
    onAccent: "#041018",
    codeKeyword: "#9CC2FF",
    codeString: "#F0C36A",
    fonts: { display: "inter", ui: "inter", code: "jetbrains" },
    families: {
      document: "#7EB0FF",
      text: "#5AD7FF",
      sections: "#A99BFF",
      lists: "#F0C36A",
      media: "#FF8F70",
      forms: "#E59BFF",
      tables: "#5EE0A8",
    },
  },
  {
    id: "android",
    name: "Android",
    description: "Android green, Roboto for UI, Orbitron for titles.",
    fontLabel: "Orbitron, Roboto, and Share Tech Mono",
    background: "#07140E",
    surface: "#102019",
    text: "#F3FBF6",
    muted: "#96B5A4",
    faint: "#1C3328",
    accent: "#3DDC84",
    accentSoft: "rgba(61, 220, 132, 0.34)",
    onAccent: "#04140C",
    codeKeyword: "#8DFFC0",
    codeString: "#F0C36A",
    fonts: { display: "orbitron", ui: "roboto", code: "shareTech" },
    families: {
      document: "#7DFFB3",
      text: "#3DDC84",
      sections: "#C6F25A",
      lists: "#F0C36A",
      media: "#FF9B6A",
      forms: "#7AD7FF",
      tables: "#D6F5A3",
    },
  },
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id);
}

export function isTemplateId(id: string): id is TemplateId {
  return templates.some((template) => template.id === id);
}
