import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { subjectById } from "../catalog/subjects";
import { fadeUp } from "./motion";
import { STAGE } from "./stage";
import { useLesson } from "./theme";

export function SafeStage({
  absolute,
  total,
  caption,
  children,
}: {
  absolute: number;
  total: number;
  caption?: string;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const { episode, template, fonts } = useLesson();
  const subject = subjectById(episode.subjectId);
  const progress = total === 0 ? 0 : absolute / total;

  return (
    <AbsoluteFill style={{ background: template.background, color: template.text, fontFamily: fonts.ui }}>
      <div
        style={{
          position: "absolute",
          top: STAGE.top,
          right: STAGE.right,
          bottom: STAGE.bottom,
          left: STAGE.left,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: fonts.code,
              fontSize: 22,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: template.muted,
            }}
          >
            <span style={{ color: template.accent }}>{subject.label}</span>
            <span>Coding Reels</span>
          </div>
          <div style={{ height: 6, background: template.faint, borderRadius: 99 }}>
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, progress * 100)}%`,
                background: template.accent,
                borderRadius: 99,
              }}
            />
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
        {caption ? (
          <p
            style={{
              ...fadeUp(frame, 8),
              margin: 0,
              fontFamily: fonts.ui,
              fontWeight: 500,
              fontSize: 46,
              lineHeight: 1.22,
              color: template.text,
            }}
          >
            {caption}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}

export function BeatHeading({ title }: { title: string }) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  return (
    <h2
      style={{
        ...fadeUp(frame, 0),
        margin: 0,
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: 52,
        lineHeight: 1.05,
        letterSpacing: template.fonts.display === "orbitron" ? 0 : -0.6,
      }}
    >
      {title}
    </h2>
  );
}
