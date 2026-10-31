import { AbsoluteFill } from "remotion";
import { HEIGHT, WIDTH } from "../catalog/time";
import { ADS_SAFE, PRACTICAL_SAFE } from "./stage";

export function Guides() {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <GuideBox inset={PRACTICAL_SAFE} color="rgba(255,255,255,0.9)" label="Safe" dashed={false} />
      <GuideBox inset={ADS_SAFE} color="rgba(255, 196, 92, 0.95)" label="Ads" dashed />
    </AbsoluteFill>
  );
}

function GuideBox({
  inset,
  color,
  label,
  dashed,
}: {
  inset: { top: number; right: number; bottom: number; left: number };
  color: string;
  label: string;
  dashed: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: inset.top,
        left: inset.left,
        border: `3px ${dashed ? "dashed" : "solid"} ${color}`,
        color,
        fontFamily: "Inter, sans-serif",
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 1,
        padding: 8,
        width: WIDTH - inset.left - inset.right,
        height: HEIGHT - inset.top - inset.bottom,
        boxSizing: "border-box",
      }}
    >
      {label}
    </div>
  );
}
