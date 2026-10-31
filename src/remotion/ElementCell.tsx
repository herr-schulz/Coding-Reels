import type { CSSProperties } from "react";
import type { HtmlElement } from "../catalog/types";
import { useLesson } from "./theme";

export function ElementCell({
  element,
  hot,
  dim,
  size,
  badge,
  style,
}: {
  element: HtmlElement;
  hot: boolean;
  dim: boolean;
  size: "map" | "large";
  badge?: number;
  style?: CSSProperties;
}) {
  const { template, fonts } = useLesson();
  const color = template.families[element.family];
  const large = size === "large";
  const symbol = large
    ? element.tag.length > 6
      ? 34
      : 50
    : element.tag.length > 6
      ? 18
      : element.tag.length > 3
        ? 24
        : 32;

  const opacity = typeof style?.opacity === "number" ? style.opacity : dim ? 0.22 : 1;

  return (
    <div
      style={{
        ...style,
        opacity,
        background: template.surface,
        borderRadius: large ? 16 : 8,
        border: element.void
          ? `2px dashed ${hot ? color : template.faint}`
          : `2px solid ${hot ? color : template.faint}`,
        boxSizing: "border-box",
        minHeight: large ? 132 : 54,
        padding: large ? "10px 12px 12px" : "4px 6px 6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: fonts.code, fontSize: large ? 16 : 11, color: template.muted }}>
        {String(badge ?? element.number).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: fonts.code,
          fontSize: symbol,
          lineHeight: 1,
          textAlign: "center",
          color,
        }}
      >
        {element.tag}
      </span>
      {large ? (
        <span
          style={{
            fontFamily: fonts.ui,
            fontSize: 18,
            textAlign: "center",
            color: template.muted,
          }}
        >
          {element.name}
        </span>
      ) : (
        <span />
      )}
    </div>
  );
}
