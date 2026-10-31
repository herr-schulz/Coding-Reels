import { sec } from "../time";
import type { Episode } from "../types";

export const htmlVoidElements: Episode = {
  id: "html-void-elements",
  title: "Tags that never close",
  thesis: "Thirteen HTML elements are void. An end tag must not be written.",
  subjectId: "html",
  templateId: "web",
  posterBeat: 3,
  beats: [
    {
      type: "hook",
      kicker: "HTML",
      title: "Some tags never close",
      subtitle: "An image does not wrap text. Neither do twelve others.",
      durationInFrames: sec(3.4),
    },
    {
      type: "compare",
      title: "Wraps, or does not",
      caption: "A paragraph wraps words. An image wraps nothing.",
      left: {
        label: "Pair",
        code: "<p>Hello</p>",
        language: "html",
        note: "Start and end.",
      },
      right: {
        label: "Void",
        code: '<img alt="A cat">',
        language: "html",
        note: "Start only.",
      },
      durationInFrames: sec(6.5),
    },
    {
      type: "code",
      language: "html",
      title: "The slash does nothing",
      code: '<img alt="A cat">\n<img alt="A cat" />',
      focusLines: [2],
      caption: "In HTML that slash is optional, and it is not a container.",
      durationInFrames: sec(6.5),
    },
    {
      type: "tagTable",
      mode: "void",
      title: "The void elements",
      caption: "The HTML living standard lists these 13.",
      durationInFrames: sec(10),
    },
    {
      type: "end",
      title: "Thirteen, and no more.",
      subtitle: "Omitting </p> is different. A void tag must not wrap anything.",
      durationInFrames: sec(4.2),
    },
  ],
};
