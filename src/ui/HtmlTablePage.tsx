import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { elementsByFamily, getElement } from "../catalog/htmlElements";
import { isTemplateId, templates } from "../catalog/templates";
import { VOID_TAGS } from "../catalog/htmlElements";
import { loadedFonts } from "../remotion/fonts";
import { highlight } from "../remotion/highlight";

export function HtmlTablePage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("template");
  const template = templates.find((item) => item.id === (requested && isTemplateId(requested) ? requested : "web")) ?? templates[0];
  const [selected, setSelected] = useState("img");
  const element = getElement(selected);
  const example = useMemo(() => highlight(element.example, "html").flat(), [element.example]);
  if (!template) return null;
  const fonts = {
    display: loadedFonts[template.fonts.display],
    ui: loadedFonts[template.fonts.ui],
    code: loadedFonts[template.fonts.code],
  };

  return (
    <div className="wrap">
      <p className="eyebrow">
        <Link to="/">Shelf</Link>
        <span aria-hidden="true"> / </span>
        HTML
      </p>
      <header className="mast">
        <h1 style={{ fontFamily: fonts.display }}>HTML, the table of elements</h1>
        <p className="lede">
          Same idea as a chemistry table: each cell is one element. Dashed cells are void. The living
          standard lists {VOID_TAGS.length}, and an end tag must not be written for them.
        </p>
      </header>
      <div className="switch" role="group" aria-label="Table template">
        {templates.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === template.id}
            onClick={() => setParams({ template: item.id })}
          >
            <span className="swatch" style={{ background: item.accent }} />
            <span>
              <strong style={{ fontFamily: loadedFonts[item.fonts.display] }}>{item.name}</strong>
              <span className="quiet">{item.fontLabel}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="table-layout">
        <div className="poster" style={{ background: template.background, color: template.text, fontFamily: fonts.ui }}>
          {elementsByFamily().map((group) => (
            <section key={group.family.id}>
              <h2 style={{ color: template.families[group.family.id] }}>{group.family.label}</h2>
              <div className="poster-grid">
                {group.elements.map((item) => {
                  const color = template.families[item.family];
                  const on = item.tag === element.tag;
                  return (
                    <button
                      key={item.tag}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSelected(item.tag)}
                      style={{
                        borderColor: on ? color : item.void ? color : template.faint,
                        borderStyle: item.void ? "dashed" : "solid",
                        background: template.surface,
                        color: template.text,
                        fontFamily: fonts.code,
                      }}
                    >
                      <span style={{ color: template.muted }}>{String(item.number).padStart(2, "0")}</span>
                      <strong style={{ color }}>{item.tag}</strong>
                      <span style={{ fontFamily: fonts.ui, color: template.muted }}>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <aside className="detail" style={{ fontFamily: fonts.ui }}>
          <p className="quiet">{element.void ? "Void element" : "Has an end tag"}</p>
          <h2 style={{ fontFamily: fonts.display, color: template.families[element.family] }}>{element.tag}</h2>
          <p>{element.name}</p>
          <p className="example" style={{ fontFamily: fonts.code }}>
            {example.map((token, index) => (
              <span
                key={index}
                style={{
                  color:
                    token.tone === "name"
                      ? template.accent
                      : token.tone === "string"
                        ? template.codeString
                        : token.tone === "attr"
                          ? template.codeKeyword
                          : template.text,
                }}
              >
                {token.text}
              </span>
            ))}
          </p>
          <p className="quiet">
            {element.void
              ? "Nothing goes inside, so the end tag is forbidden."
              : "Write a start tag, the content, then the end tag."}
          </p>
        </aside>
      </div>
    </div>
  );
}
