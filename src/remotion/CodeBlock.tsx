import { useCurrentFrame } from "remotion";
import { fadeUp } from "./motion";
import { highlight, type Tone } from "./highlight";
import { useLesson } from "./theme";

export function CodeBlock({
  code,
  language,
  title,
  focusLines,
  fontSize = 42,
}: {
  code: string;
  language: "html" | "css";
  title?: string;
  focusLines?: number[];
  fontSize?: number;
}) {
  const frame = useCurrentFrame();
  const { template, fonts } = useLesson();
  const lines = highlight(code, language);

  return (
    <div
      style={{
        ...fadeUp(frame, 2),
        background: template.surface,
        border: `2px solid ${template.faint}`,
        borderRadius: 22,
        padding: "26px 28px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          fontFamily: fonts.code,
          fontSize: 22,
          letterSpacing: 1.4,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: template.accent }}>{language}</span>
        {title ? <span style={{ color: template.muted }}>{title}</span> : null}
      </div>
      <div style={{ fontFamily: fonts.code, fontSize, lineHeight: 1.38 }}>
        {lines.map((line, lineIndex) => {
          const focused = !focusLines || focusLines.includes(lineIndex + 1);
          return (
            <div key={lineIndex} style={{ display: "flex", opacity: focused ? 1 : 0.34 }}>
              <span style={{ width: 48, color: template.muted }}>{lineIndex + 1}</span>
              <span
                style={{
                  borderLeft:
                    focusLines && focused ? `7px solid ${template.accent}` : "7px solid transparent",
                  paddingLeft: 14,
                  whiteSpace: "pre",
                }}
              >
                {line.length === 0
                  ? " "
                  : line.map((token, tokenIndex) => (
                      <span key={tokenIndex} style={{ color: toneColor(token.tone, template) }}>
                        {token.text}
                      </span>
                    ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function toneColor(
  tone: Tone,
  template: { text: string; muted: string; accent: string; codeKeyword: string; codeString: string },
) {
  switch (tone) {
    case "name":
    case "selector":
      return template.accent;
    case "attr":
    case "prop":
      return template.codeKeyword;
    case "string":
      return template.codeString;
    case "comment":
    case "punct":
      return template.muted;
    default:
      return template.text;
  }
}
