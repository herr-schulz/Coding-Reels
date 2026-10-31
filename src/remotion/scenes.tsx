import { interpolate } from "remotion";
import { elementsByFamily, getElement, voidElements } from "../catalog/htmlElements";
import type { Beat, BoxLayer } from "../catalog/types";
import { CodeBlock } from "./CodeBlock";
import { ElementCell } from "./ElementCell";
import { BeatHeading, SafeStage } from "./chrome";
import { fadeUp, reveal } from "./motion";
import { useLesson } from "./theme";
import { useCurrentFrame } from "remotion";

type Timed = { absolute: number; total: number };

export function HookScene({ beat, absolute, total }: { beat: Extract<Beat, { type: "hook" }> } & Timed) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  return (
    <SafeStage absolute={absolute} total={total}>
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ ...fadeUp(frame, 0), width: 84, height: 8, background: template.accent }} />
        <div
          style={{
            ...fadeUp(frame, 4),
            fontFamily: fonts.code,
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: template.accent,
          }}
        >
          {beat.kicker}
        </div>
        <h1
          style={{
            ...fadeUp(frame, 8),
            margin: 0,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: template.fonts.display === "orbitron" ? 0 : -1.4,
          }}
        >
          {beat.title}
        </h1>
        <p
          style={{
            ...fadeUp(frame, 16),
            margin: 0,
            maxWidth: 760,
            fontSize: 40,
            lineHeight: 1.25,
            color: template.muted,
          }}
        >
          {beat.subtitle}
        </p>
      </div>
    </SafeStage>
  );
}

export function AnatomyScene({
  beat,
  absolute,
  total,
}: { beat: Extract<Beat, { type: "anatomy" }> } & Timed) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  const parts = [
    { label: "Start", value: `<${beat.tag}>`, delay: 4 },
    { label: "Content", value: beat.content, delay: 14 },
    { label: "End", value: `</${beat.tag}>`, delay: 24 },
  ];
  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title="Open, content, close" />
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 28 }}>
        {parts.map((part) => (
          <div key={part.label} style={{ ...fadeUp(frame, part.delay), display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: fonts.code,
                fontSize: 22,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: template.accent,
              }}
            >
              {part.label}
            </span>
            <span style={{ fontFamily: fonts.code, fontSize: 72, lineHeight: 1 }}>{part.value}</span>
          </div>
        ))}
      </div>
    </SafeStage>
  );
}

export function CodeScene({ beat, absolute, total }: { beat: Extract<Beat, { type: "code" }> } & Timed) {
  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title={beat.title} />
      <div style={{ margin: "auto 0" }}>
        <CodeBlock code={beat.code} language={beat.language} title={beat.title} focusLines={beat.focusLines} />
      </div>
    </SafeStage>
  );
}

export function CompareScene({
  beat,
  absolute,
  total,
}: { beat: Extract<Beat, { type: "compare" }> } & Timed) {
  const frame = useCurrentFrame();
  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title={beat.title} />
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 22 }}>
        {[beat.left, beat.right].map((side, index) => (
          <div key={side.label} style={fadeUp(frame, index * 10)}>
            <CodeBlock code={side.code} language={side.language} title={`${side.label} · ${side.note}`} fontSize={40} />
          </div>
        ))}
      </div>
    </SafeStage>
  );
}

export function TagTableScene({
  beat,
  absolute,
  total,
}: { beat: Extract<Beat, { type: "tagTable" }> } & Timed) {
  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title={beat.title} />
      {beat.mode === "void" ? <VoidGrid /> : <ElementMap highlight={beat.highlight} />}
    </SafeStage>
  );
}

function ElementMap({ highlight }: { highlight?: string[] }) {
  const frame = useCurrentFrame();
  const hot = new Set(highlight ?? []);
  let index = 0;
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
      {elementsByFamily().map((group) => (
        <div
          key={group.family.id}
          style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 6 }}
        >
          {group.elements.map((element) => {
            const delay = index * 0.28;
            index += 1;
            const shown = reveal(frame, delay);
            const emphasized = hot.size === 0 || hot.has(element.tag);
            return (
              <ElementCell
                key={element.tag}
                element={element}
                size="map"
                hot={hot.has(element.tag)}
                dim={false}
                style={{ opacity: shown * (emphasized ? 1 : 0.28) }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function VoidGrid() {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  const elements = voidElements();
  const lit = Math.round(
    interpolate(frame, [16, 16 + elements.length * 6], [0, elements.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontFamily: fonts.code, fontSize: 22, letterSpacing: 2, color: template.muted }}>
          VOID
        </span>
        <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 84, lineHeight: 0.9, color: template.accent }}>
          {String(lit).padStart(2, "0")}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        {elements.map((element, index) => (
          <ElementCell
            key={element.tag}
            element={element}
            size="large"
            badge={index + 1}
            hot={index < lit}
            dim={index >= lit}
          />
        ))}
      </div>
    </div>
  );
}

export function SpotlightScene({
  beat,
  absolute,
  total,
}: { beat: Extract<Beat, { type: "spotlights" }> } & Timed) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title={beat.title} />
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 18 }}>
        {beat.tags.map((item, index) => {
          const element = getElement(item.tag);
          return (
            <div key={item.tag} style={{ ...fadeUp(frame, index * 8), display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{ width: 168, flex: "0 0 168px" }}>
                <ElementCell element={element} size="large" hot dim={false} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40 }}>{element.name}</span>
                <span style={{ fontSize: 30, color: template.muted }}>{item.line}</span>
                <span style={{ fontFamily: fonts.code, fontSize: 28, color: template.accent }}>{element.example}</span>
              </div>
            </div>
          );
        })}
      </div>
    </SafeStage>
  );
}

const BOX_LAYERS: BoxLayer[] = ["content", "padding", "border", "margin"];

export function BoxScene({ beat, absolute, total }: { beat: Extract<Beat, { type: "box" }> } & Timed) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  const padding = 40 * layerAmount("padding", beat, frame);
  const border = 14 * layerAmount("border", beat, frame);
  const margin = 46 * layerAmount("margin", beat, frame);
  const content = layerAmount("content", beat, frame);

  return (
    <SafeStage absolute={absolute} total={total} caption={beat.caption}>
      <BeatHeading title={beat.title} />
      <div style={{ flex: 1, display: "flex", gap: 28, alignItems: "center", minHeight: 0 }}>
        <div style={{ width: 210, display: "flex", flexDirection: "column", gap: 16 }}>
          {BOX_LAYERS.map((layer) => {
            const on = beat.visible.includes(layer);
            const active = beat.active === layer;
            return (
              <div
                key={layer}
                style={{
                  fontFamily: active ? fonts.display : fonts.ui,
                  fontWeight: 700,
                  fontSize: active ? 36 : 28,
                  color: active ? template.accent : on ? template.text : template.muted,
                  opacity: on ? 1 : 0.35,
                  textTransform: "capitalize",
                }}
              >
                {layer}
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: margin,
              border: `3px dashed ${margin > 4 ? template.accent : "transparent"}`,
              borderRadius: 28,
            }}
          >
            <div
              style={{
                border: `${border}px solid ${template.accent}`,
                borderRadius: 18,
                background: template.background,
              }}
            >
              <div style={{ padding, background: padding > 2 ? template.accentSoft : "transparent" }}>
                <div
                  style={{
                    width: 300,
                    height: 168,
                    background: template.surface,
                    border: `2px solid ${template.faint}`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: content,
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 64,
                  }}
                >
                  Hello
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SafeStage>
  );
}

function layerAmount(layer: BoxLayer, beat: Extract<Beat, { type: "box" }>, frame: number) {
  if (!beat.visible.includes(layer)) return 0;
  if (beat.active !== layer) return 1;
  return reveal(frame, 4);
}

export function EndScene({ beat, absolute, total }: { beat: Extract<Beat, { type: "end" }> } & Timed) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  return (
    <SafeStage absolute={absolute} total={total}>
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ ...fadeUp(frame, 0), width: 84, height: 8, background: template.accent }} />
        <h1
          style={{
            ...fadeUp(frame, 6),
            margin: 0,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1,
          }}
        >
          {beat.title}
        </h1>
        <p style={{ ...fadeUp(frame, 14), margin: 0, fontSize: 38, lineHeight: 1.25, color: template.muted }}>
          {beat.subtitle}
        </p>
      </div>
    </SafeStage>
  );
}
