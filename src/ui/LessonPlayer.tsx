import { Player, type PlayerRef } from "@remotion/player";
import { useMemo, type Ref } from "react";
import type { Episode } from "../catalog/types";
import { FPS, HEIGHT, WIDTH, totalFrames } from "../catalog/time";
import { EpisodeVideo } from "../remotion/EpisodeVideo";

export function LessonPlayer({
  episode,
  templateId,
  showGuides,
  initialFrame,
  controls,
  autoPlay,
  loop,
  playerRef,
}: {
  episode: Episode;
  templateId: string;
  showGuides: boolean;
  initialFrame?: number;
  controls: boolean;
  autoPlay: boolean;
  loop: boolean;
  playerRef?: Ref<PlayerRef>;
}) {
  const duration = totalFrames(episode);
  const frame = Math.min(initialFrame ?? 0, Math.max(0, duration - 1));
  const inputProps = useMemo(
    () => ({ episodeId: episode.id, templateId, showGuides }),
    [episode.id, templateId, showGuides],
  );

  return (
    <Player
      ref={playerRef}
      component={EpisodeVideo}
      inputProps={inputProps}
      durationInFrames={duration}
      compositionWidth={WIDTH}
      compositionHeight={HEIGHT}
      fps={FPS}
      initialFrame={frame}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      initialVolume={0}
      clickToPlay={controls}
      acknowledgeRemotionLicense
      style={{ width: "100%" }}
    />
  );
}
