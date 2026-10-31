export type Tone =
  | "text"
  | "punct"
  | "name"
  | "attr"
  | "string"
  | "comment"
  | "prop"
  | "value"
  | "selector";

export type Token = { text: string; tone: Tone };

export function highlight(code: string, language: "html" | "css"): Token[][] {
  return code.split("\n").map((line) =>
    language === "css" ? highlightCssLine(line) : highlightHtmlLine(line),
  );
}

function push(tokens: Token[], text: string, tone: Tone) {
  if (text.length > 0) tokens.push({ text, tone });
}

function highlightHtmlLine(line: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  while (index < line.length) {
    if (line.startsWith("<!--", index)) {
      const end = line.indexOf("-->", index + 4);
      const stop = end === -1 ? line.length : end + 3;
      push(tokens, line.slice(index, stop), "comment");
      index = stop;
      continue;
    }
    if (line[index] !== "<") {
      const start = index;
      while (index < line.length && line[index] !== "<") index += 1;
      push(tokens, line.slice(start, index), "text");
      continue;
    }
    push(tokens, "<", "punct");
    index += 1;
    if (line[index] === "/") {
      push(tokens, "/", "punct");
      index += 1;
    }
    const nameStart = index;
    while (index < line.length && /[A-Za-z0-9]/.test(line[index] ?? "")) index += 1;
    push(tokens, line.slice(nameStart, index), "name");
    while (index < line.length && line[index] !== ">") {
      const ch = line[index] ?? "";
      if (/\s/.test(ch)) {
        const start = index;
        while (index < line.length && /\s/.test(line[index] ?? "")) index += 1;
        push(tokens, line.slice(start, index), "text");
        continue;
      }
      if (ch === "/" || ch === "=") {
        push(tokens, ch, "punct");
        index += 1;
        continue;
      }
      if (ch === '"' || ch === "'") {
        const start = index;
        index += 1;
        while (index < line.length && line[index] !== ch) index += 1;
        if (index < line.length) index += 1;
        push(tokens, line.slice(start, index), "string");
        continue;
      }
      if (/[A-Za-z_:]/.test(ch)) {
        const start = index;
        while (index < line.length && /[A-Za-z0-9_:-]/.test(line[index] ?? "")) index += 1;
        push(tokens, line.slice(start, index), "attr");
        continue;
      }
      push(tokens, ch, "text");
      index += 1;
    }
    if (line[index] === ">") {
      push(tokens, ">", "punct");
      index += 1;
    }
  }
  return tokens;
}

function highlightCssLine(line: string): Token[] {
  if (line.trim().startsWith("/*")) return [{ text: line, tone: "comment" }];
  const brace = line.indexOf("{");
  if (brace !== -1 && !line.includes(":")) {
    return [
      { text: line.slice(0, brace), tone: "selector" },
      { text: line.slice(brace), tone: "punct" },
    ];
  }
  if (line.trim() === "}") {
    const indent = line.match(/^\s*/)?.[0] ?? "";
    const tokens: Token[] = [
      { text: indent, tone: "text" },
      { text: line.slice(indent.length), tone: "punct" },
    ];
    return tokens.filter((token) => token.text.length > 0);
  }
  const colon = line.indexOf(":");
  if (colon === -1) return line.length > 0 ? [{ text: line, tone: "text" }] : [];
  const semi = line.lastIndexOf(";");
  const end = semi === -1 ? line.length : semi;
  const tokens: Token[] = [
    { text: line.slice(0, colon), tone: "prop" },
    { text: ":", tone: "punct" },
    { text: line.slice(colon + 1, end), tone: "value" },
  ];
  if (semi !== -1) tokens.push({ text: line.slice(semi), tone: "punct" });
  return tokens;
}
