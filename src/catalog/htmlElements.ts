import type { HtmlElement, HtmlFamily } from "./types";

/** Void elements from the HTML Living Standard. End tags must not be specified. */
export const VOID_TAGS = [
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
] as const;

const VOID = new Set<string>(VOID_TAGS);

export const HTML_FAMILIES: { id: HtmlFamily; label: string }[] = [
  { id: "document", label: "Document" },
  { id: "text", label: "Text" },
  { id: "sections", label: "Sections" },
  { id: "lists", label: "Lists" },
  { id: "media", label: "Media" },
  { id: "forms", label: "Forms" },
  { id: "tables", label: "Tables" },
];

const drafts: Omit<HtmlElement, "number" | "void">[] = [
  { tag: "html", name: "Root", family: "document", example: '<html lang="en">' },
  { tag: "head", name: "Head", family: "document", example: "<head>" },
  { tag: "body", name: "Body", family: "document", example: "<body>" },
  { tag: "title", name: "Title", family: "document", example: "<title>Hello</title>" },
  { tag: "meta", name: "Metadata", family: "document", example: '<meta charset="utf-8">' },
  { tag: "link", name: "Link", family: "document", example: '<link rel="stylesheet" href="site.css">' },
  { tag: "base", name: "Base URL", family: "document", example: '<base href="https://example.com/">' },
  { tag: "h1", name: "Heading", family: "text", example: "<h1>Title</h1>" },
  { tag: "h2", name: "Heading", family: "text", example: "<h2>Section</h2>" },
  { tag: "h3", name: "Heading", family: "text", example: "<h3>Detail</h3>" },
  { tag: "p", name: "Paragraph", family: "text", example: "<p>Hello</p>" },
  { tag: "a", name: "Anchor", family: "text", example: '<a href="/docs">Docs</a>' },
  { tag: "span", name: "Span", family: "text", example: "<span>word</span>" },
  { tag: "strong", name: "Strong", family: "text", example: "<strong>important</strong>" },
  { tag: "em", name: "Emphasis", family: "text", example: "<em>stress</em>" },
  { tag: "code", name: "Code", family: "text", example: "<code>npm</code>" },
  { tag: "blockquote", name: "Quote", family: "text", example: "<blockquote>A quote</blockquote>" },
  { tag: "br", name: "Break", family: "text", example: "line one<br>line two" },
  { tag: "hr", name: "Rule", family: "text", example: "<hr>" },
  { tag: "wbr", name: "Word break", family: "text", example: "super<wbr>long" },
  { tag: "div", name: "Division", family: "sections", example: '<div class="card">' },
  { tag: "header", name: "Header", family: "sections", example: "<header>" },
  { tag: "nav", name: "Navigation", family: "sections", example: "<nav>" },
  { tag: "main", name: "Main", family: "sections", example: "<main>" },
  { tag: "section", name: "Section", family: "sections", example: "<section>" },
  { tag: "article", name: "Article", family: "sections", example: "<article>" },
  { tag: "aside", name: "Aside", family: "sections", example: "<aside>" },
  { tag: "footer", name: "Footer", family: "sections", example: "<footer>" },
  { tag: "ul", name: "Unordered", family: "lists", example: "<ul><li>One</li></ul>" },
  { tag: "ol", name: "Ordered", family: "lists", example: "<ol><li>One</li></ol>" },
  { tag: "li", name: "List item", family: "lists", example: "<li>One</li>" },
  { tag: "img", name: "Image", family: "media", example: '<img alt="A cat">' },
  { tag: "picture", name: "Picture", family: "media", example: "<picture>" },
  { tag: "video", name: "Video", family: "media", example: "<video controls>" },
  { tag: "audio", name: "Audio", family: "media", example: "<audio controls>" },
  { tag: "source", name: "Source", family: "media", example: '<source src="film.mp4">' },
  { tag: "track", name: "Track", family: "media", example: '<track kind="captions">' },
  { tag: "embed", name: "Embed", family: "media", example: '<embed src="file.svg">' },
  { tag: "area", name: "Area", family: "media", example: '<area alt="Sun" href="/sun">' },
  { tag: "form", name: "Form", family: "forms", example: '<form action="/go">' },
  { tag: "label", name: "Label", family: "forms", example: '<label for="name">Name</label>' },
  { tag: "input", name: "Input", family: "forms", example: '<input name="q">' },
  { tag: "button", name: "Button", family: "forms", example: '<button type="submit">Go</button>' },
  { tag: "textarea", name: "Text area", family: "forms", example: '<textarea name="bio"></textarea>' },
  { tag: "select", name: "Select", family: "forms", example: '<select name="color"></select>' },
  { tag: "table", name: "Table", family: "tables", example: "<table>" },
  { tag: "thead", name: "Head", family: "tables", example: "<thead>" },
  { tag: "tbody", name: "Body", family: "tables", example: "<tbody>" },
  { tag: "tr", name: "Row", family: "tables", example: "<tr>" },
  { tag: "th", name: "Header cell", family: "tables", example: "<th>Name</th>" },
  { tag: "td", name: "Data cell", family: "tables", example: "<td>Ada</td>" },
  { tag: "col", name: "Column", family: "tables", example: "<col>" },
];

export const HTML_ELEMENTS: HtmlElement[] = drafts.map((item, index) => ({
  ...item,
  number: index + 1,
  void: VOID.has(item.tag),
}));

export function getElement(tag: string) {
  const found = HTML_ELEMENTS.find((element) => element.tag === tag);
  if (!found) throw new Error(`Unknown HTML element <${tag}>`);
  return found;
}

export function elementsByFamily() {
  return HTML_FAMILIES.map((family) => ({
    family,
    elements: HTML_ELEMENTS.filter((element) => element.family === family.id),
  }));
}

export function voidElements() {
  return VOID_TAGS.map((tag) => getElement(tag));
}
