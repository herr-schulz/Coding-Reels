import { describe, expect, it } from "vitest";
import { beatSummary } from "./beatSummary";
import { episodes, getEpisode } from "./episodes";
import { HTML_ELEMENTS, VOID_TAGS, getElement } from "./htmlElements";
import { subjects } from "./subjects";
import { getTemplate, templates } from "./templates";
import { FPS, beatStarts, renderCommand, totalFrames } from "./time";
import { highlight } from "../remotion/highlight";

describe("html elements", () => {
  it("lists the 13 void elements from the HTML living standard", () => {
    expect([...VOID_TAGS].sort()).toEqual(
      [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "source",
        "track",
        "wbr",
      ].sort(),
    );
    expect(HTML_ELEMENTS.filter((element) => element.void).map((element) => element.tag).sort()).toEqual(
      [...VOID_TAGS].sort(),
    );
  });

  it("keeps tag names unique", () => {
    const tags = HTML_ELEMENTS.map((element) => element.tag);
    expect(new Set(tags).size).toBe(tags.length);
  });
});

describe("episodes", () => {
  it("saves a unique lesson for each id, on a real subject and template", () => {
    const ids = episodes.map((episode) => episode.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const episode of episodes) {
      expect(subjects.some((subject) => subject.id === episode.subjectId)).toBe(true);
      expect(getTemplate(episode.templateId)).toBeDefined();
      expect(episode.beats.length).toBeGreaterThan(2);
      expect(episode.posterBeat).toBeGreaterThanOrEqual(0);
      expect(episode.posterBeat).toBeLessThan(episode.beats.length);
      const seconds = totalFrames(episode) / FPS;
      expect(seconds).toBeGreaterThan(20);
      expect(seconds).toBeLessThan(50);
      expect(beatStarts(episode)).toHaveLength(episode.beats.length);
      for (const beat of episode.beats) {
        expect(beat.durationInFrames).toBeGreaterThan(0);
        expect(beatSummary(beat).length).toBeGreaterThan(0);
        if (beat.type === "spotlights" || (beat.type === "tagTable" && beat.highlight)) {
          const tags = beat.type === "spotlights" ? beat.tags.map((item) => item.tag) : beat.highlight ?? [];
          for (const tag of tags) expect(getElement(tag).tag).toBe(tag);
        }
      }
    }
  });

  it("includes the first three lessons", () => {
    expect(getEpisode("html-tags")?.title).toBe("What is a tag?");
    expect(getEpisode("html-void-elements")?.thesis).toContain("Thirteen");
    expect(getEpisode("css-box-model")?.subjectId).toBe("css");
  });
});

describe("templates", () => {
  it("gives web and android different colors and fonts", () => {
    const web = templates.find((template) => template.id === "web");
    const android = templates.find((template) => template.id === "android");
    expect(web?.accent).not.toBe(android?.accent);
    expect(web?.fonts.display).not.toBe(android?.fonts.display);
    expect(android?.fonts.display).toBe("orbitron");
    expect(web?.fonts.code).toBe("jetbrains");
  });
});

describe("highlight", () => {
  it("round-trips the sample markup", () => {
    for (const sample of ['<p>Hello</p>', '<img alt="A cat" />', '<a href="/docs">Docs</a>']) {
      const text = highlight(sample, "html")
        .flat()
        .map((token) => token.text)
        .join("");
      expect(text).toBe(sample);
    }
    expect(highlight("<p>Hello</p>", "html")[0]?.some((token) => token.text === "p" && token.tone === "name")).toBe(
      true,
    );
  });

  it("round-trips a css rule", () => {
    const sample = ".card {\n  padding: 24px;\n}";
    const text = highlight(sample, "css")
      .flatMap((line, index) => (index === 0 ? [] : ["\n"]).concat(line.map((token) => token.text)))
      .join("");
    expect(text).toBe(sample);
  });
});

describe("render command", () => {
  it("names the lesson and leaves the guides off the mp4", () => {
    const command = renderCommand("html-tags", "android");
    expect(command).toContain("pnpm render html-tags");
    expect(command).toContain('"templateId":"android"');
    expect(command).toContain('"showGuides":false');
  });
});
