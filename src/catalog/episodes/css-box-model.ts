import { sec } from "../time";
import type { Episode } from "../types";

export const cssBoxModel: Episode = {
  id: "css-box-model",
  title: "The box model",
  thesis: "Every element is a box: content, padding, border, then margin.",
  subjectId: "css",
  templateId: "web",
  posterBeat: 4,
  beats: [
    {
      type: "hook",
      kicker: "CSS",
      title: "Four layers, one box",
      subtitle: "Content, padding, border, and margin.",
      durationInFrames: sec(3.2),
    },
    {
      type: "box",
      title: "Content",
      caption: "The words or the image. The box starts here.",
      visible: ["content"],
      active: "content",
      durationInFrames: sec(4.6),
    },
    {
      type: "box",
      title: "Padding",
      caption: "Padding sits inside the border, around the content.",
      visible: ["content", "padding"],
      active: "padding",
      durationInFrames: sec(4.6),
    },
    {
      type: "box",
      title: "Border",
      caption: "The border is the visible edge of the box.",
      visible: ["content", "padding", "border"],
      active: "border",
      durationInFrames: sec(4.6),
    },
    {
      type: "box",
      title: "Margin",
      caption: "Margin is outside. It is transparent space.",
      visible: ["content", "padding", "border", "margin"],
      active: "margin",
      durationInFrames: sec(5),
    },
    {
      type: "code",
      language: "css",
      title: "border-box",
      code: ".card {\n  box-sizing: border-box;\n  width: 240px;\n  padding: 24px;\n  border: 8px solid;\n  margin: 32px;\n}",
      focusLines: [2],
      caption: "border-box keeps padding and border inside the width.",
      durationInFrames: sec(7),
    },
    {
      type: "end",
      title: "Inside, then out.",
      subtitle: "Content, padding, border, margin.",
      durationInFrames: sec(3.6),
    },
  ],
};
