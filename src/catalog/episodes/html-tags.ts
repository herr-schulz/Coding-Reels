import { sec } from "../time";
import type { Episode } from "../types";

export const htmlTags: Episode = {
  id: "html-tags",
  title: "What is a tag?",
  thesis: "A tag names a part of the page, and most tags wrap something.",
  subjectId: "html",
  templateId: "web",
  posterBeat: 3,
  beats: [
    {
      type: "hook",
      kicker: "HTML",
      title: "Tags name the parts",
      subtitle: "The browser reads a name, then whatever that tag wraps.",
      durationInFrames: sec(3.2),
    },
    {
      type: "anatomy",
      tag: "p",
      content: "Hello",
      caption: "The slash marks the end of the pair.",
      durationInFrames: sec(6.5),
    },
    {
      type: "code",
      language: "html",
      title: "A paragraph",
      code: `<p>Hello</p>\n<a href="/docs">Docs</a>`,
      focusLines: [1],
      caption: "Most tags open, wrap something, then close.",
      durationInFrames: sec(6),
    },
    {
      type: "tagTable",
      mode: "map",
      title: "A table of elements",
      caption: "Dashed cells are not allowed to close.",
      highlight: ["p", "a", "img"],
      durationInFrames: sec(6.5),
    },
    {
      type: "spotlights",
      title: "Three you will use",
      caption: "A paragraph, a link, and an image.",
      tags: [
        { tag: "p", line: "Wraps a block of text." },
        { tag: "a", line: "Wraps the words you can open." },
        { tag: "img", line: "Points at a picture. No end tag." },
      ],
      durationInFrames: sec(7),
    },
    {
      type: "end",
      title: "A tag is a name.",
      subtitle: "A pair wraps something. Thirteen tags never close.",
      durationInFrames: sec(3.6),
    },
  ],
};
