import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { getEpisode } from "../catalog/episodes";
import { getTemplate } from "../catalog/templates";
import type { Beat } from "../catalog/types";
import { totalFrames } from "../catalog/time";
import { Guides } from "./Guides";
import { useFontGate } from "./fonts";
import {
  AnatomyScene,
  BoxScene,
  CodeScene,
  CompareScene,
  EndScene,
  HookScene,
  SpotlightScene,
  TagTableScene,
} from "./scenes";
import { LessonProvider } from "./theme";

export type EpisodeVideoProps = {
  episodeId: string;
  templateId: string;
  showGuides: boolean;
};

export const EpisodeVideo = ({ episodeId, templateId, showGuides }: EpisodeVideoProps) => {
  useFontGate();
  const episode = getEpisode(episodeId);
  const template = getTemplate(templateId);
  if (!episode || !template) {
    return (
      <AbsoluteFill
        style={{ background: "#07090d", color: "white", fontSize: 48, padding: 80, fontFamily: "sans-serif" }}
      >
        This lesson is not in the catalog.
      </AbsoluteFill>
    );
  }

  const total = totalFrames(episode);
  let cursor = 0;

  return (
    <LessonProvider episode={episode} template={template}>
      <AbsoluteFill style={{ background: template.background }}>
        {episode.beats.map((beat, index) => {
          const from = cursor;
          cursor += beat.durationInFrames;
          return (
            <Sequence key={`${beat.type}-${index}`} from={from} durationInFrames={beat.durationInFrames}>
              <BeatSwitch beat={beat} from={from} total={total} />
            </Sequence>
          );
        })}
        {showGuides ? <Guides /> : null}
      </AbsoluteFill>
    </LessonProvider>
  );
};

function BeatSwitch({ beat, from, total }: { beat: Beat; from: number; total: number }) {
  const absolute = from + useCurrentFrame();
  switch (beat.type) {
    case "hook":
      return <HookScene beat={beat} absolute={absolute} total={total} />;
    case "anatomy":
      return <AnatomyScene beat={beat} absolute={absolute} total={total} />;
    case "code":
      return <CodeScene beat={beat} absolute={absolute} total={total} />;
    case "compare":
      return <CompareScene beat={beat} absolute={absolute} total={total} />;
    case "tagTable":
      return <TagTableScene beat={beat} absolute={absolute} total={total} />;
    case "spotlights":
      return <SpotlightScene beat={beat} absolute={absolute} total={total} />;
    case "box":
      return <BoxScene beat={beat} absolute={absolute} total={total} />;
    case "end":
      return <EndScene beat={beat} absolute={absolute} total={total} />;
    default: {
      const exhaustive: never = beat;
      return exhaustive;
    }
  }
}
