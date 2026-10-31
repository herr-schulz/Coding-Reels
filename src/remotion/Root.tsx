import { Composition } from "remotion";
import { episodes, getEpisode } from "../catalog/episodes";
import { getTemplate } from "../catalog/templates";
import { FPS, HEIGHT, WIDTH, totalFrames } from "../catalog/time";
import { EpisodeVideo, type EpisodeVideoProps } from "./EpisodeVideo";

export const RemotionRoot = () => {
  return (
    <>
      {episodes.map((episode) => (
        <Composition
          key={episode.id}
          id={episode.id}
          component={EpisodeVideo}
          durationInFrames={totalFrames(episode)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{
            episodeId: episode.id,
            templateId: episode.templateId,
            showGuides: false,
          }}
          calculateMetadata={({ props }) => {
            const selected = getEpisode(props.episodeId) ?? episode;
            const template = getTemplate(props.templateId);
            return {
              durationInFrames: totalFrames(selected),
              props: {
                episodeId: selected.id,
                templateId: template?.id ?? selected.templateId,
                showGuides: props.showGuides,
              } satisfies EpisodeVideoProps,
            };
          }}
        />
      ))}
    </>
  );
};
