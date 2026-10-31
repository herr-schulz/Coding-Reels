export type SubjectId =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "kotlin"
  | "compose"
  | "xml";

export type TemplateId = "web" | "android";

export type FontId = "inter" | "jetbrains" | "roboto" | "orbitron" | "shareTech";

export type HtmlFamily =
  | "document"
  | "text"
  | "sections"
  | "lists"
  | "media"
  | "forms"
  | "tables";

export type BoxLayer = "content" | "padding" | "border" | "margin";

export type CompareSide = {
  label: string;
  code: string;
  language: "html" | "css";
  note: string;
};

export type Beat =
  | {
      type: "hook";
      kicker: string;
      title: string;
      subtitle: string;
      durationInFrames: number;
    }
  | {
      type: "anatomy";
      tag: string;
      content: string;
      caption: string;
      durationInFrames: number;
    }
  | {
      type: "code";
      language: "html" | "css";
      title: string;
      code: string;
      focusLines?: number[];
      caption: string;
      durationInFrames: number;
    }
  | {
      type: "tagTable";
      mode: "map" | "void";
      title: string;
      caption: string;
      highlight?: string[];
      durationInFrames: number;
    }
  | {
      type: "spotlights";
      title: string;
      caption: string;
      tags: { tag: string; line: string }[];
      durationInFrames: number;
    }
  | {
      type: "compare";
      title: string;
      caption: string;
      left: CompareSide;
      right: CompareSide;
      durationInFrames: number;
    }
  | {
      type: "box";
      title: string;
      caption: string;
      visible: BoxLayer[];
      active: BoxLayer;
      durationInFrames: number;
    }
  | {
      type: "end";
      title: string;
      subtitle: string;
      durationInFrames: number;
    };

export type Episode = {
  id: string;
  title: string;
  thesis: string;
  subjectId: SubjectId;
  templateId: TemplateId;
  posterBeat: number;
  beats: Beat[];
};

export type Template = {
  id: TemplateId;
  name: string;
  description: string;
  fontLabel: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  faint: string;
  accent: string;
  accentSoft: string;
  onAccent: string;
  codeKeyword: string;
  codeString: string;
  fonts: { display: FontId; ui: FontId; code: FontId };
  families: Record<HtmlFamily, string>;
};

export type HtmlElement = {
  tag: string;
  name: string;
  family: HtmlFamily;
  example: string;
  void: boolean;
  number: number;
};
