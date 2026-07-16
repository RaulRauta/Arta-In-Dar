"use client";

import { PatchEvent, set, unset, type StringInputProps } from "sanity";
import { newsPostTemplates, type NewsPostTemplateGuide } from "@/sanity/news-post-templates";

function Wireframe({ template }: { template: NewsPostTemplateGuide }) {
  return (
    <div className={`post-template-wire post-template-wire--${template.wireframe}`} aria-hidden="true">
      <span className="wire-title" />
      <span className="wire-lead" />
      <span className="wire-img wire-img-a" />
      <span className="wire-img wire-img-b" />
      <span className="wire-img wire-img-c" />
      <span className="wire-row wire-row-a" />
      <span className="wire-row wire-row-b" />
      <span className="wire-row wire-row-c" />
      <span className="wire-row wire-row-d" />
      <span className="wire-row wire-row-e" />
      <span className="wire-quote" />
      <span className="wire-button" />
    </div>
  );
}

export function PostTemplateInput(props: StringInputProps) {
  const { onChange, value } = props;

  return (
    <div className="post-template-input">
      <style>{`
        .post-template-input{display:grid;gap:14px}
        .post-template-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
        .post-template-card{display:grid;gap:12px;align-content:start;width:100%;min-height:100%;border:1px solid rgba(45,36,31,.16);border-radius:18px;background:linear-gradient(145deg,#fff8ec,#efe2c8);color:#2d241f;padding:14px;text-align:left;box-shadow:0 10px 22px rgba(45,36,31,.08);transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
        .post-template-card:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(45,36,31,.12)}
        .post-template-card[data-selected="true"]{border-color:#9f3f32;box-shadow:0 0 0 2px rgba(159,63,50,.18),0 16px 34px rgba(45,36,31,.13)}
        .post-template-card strong{display:block;font-size:15px;line-height:1.25}
        .post-template-card p{margin:0;color:rgba(45,36,31,.72);font-size:13px;line-height:1.5}
        .post-template-meta{display:grid;gap:7px;border-top:1px solid rgba(45,36,31,.12);padding-top:10px}
        .post-template-meta span{display:block;color:rgba(45,36,31,.68);font-size:12px;line-height:1.45}
        .post-template-meta b{color:#9f3f32;font-weight:800}
        .post-template-wire{position:relative;display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:13px;gap:6px;min-height:132px;overflow:hidden;border:1px solid rgba(45,36,31,.12);border-radius:14px;background:radial-gradient(circle at 80% 12%,rgba(201,162,77,.22),transparent 72px),#f7f1e8;padding:12px}
        .post-template-wire span{border-radius:999px;background:rgba(45,36,31,.2)}
        .post-template-wire .wire-img{border-radius:12px;background:linear-gradient(145deg,rgba(95,111,82,.42),rgba(184,107,69,.28))}
        .post-template-wire .wire-title{grid-column:1/5;background:#2d241f}
        .post-template-wire .wire-lead{grid-column:1/7;background:rgba(45,36,31,.16)}
        .post-template-wire .wire-row{background:rgba(45,36,31,.14)}
        .post-template-wire .wire-quote{border-radius:18px;background:rgba(201,162,77,.42)}
        .post-template-wire .wire-button{background:#9f3f32}
        .post-template-wire--free .wire-title{grid-column:1/6}.post-template-wire--free .wire-lead{grid-column:1/7}.post-template-wire--free .wire-row-a{grid-column:1/7}.post-template-wire--free .wire-img-a{grid-column:1/4;grid-row:4/8}.post-template-wire--free .wire-row-b{grid-column:4/7}.post-template-wire--free .wire-row-c{grid-column:4/7}.post-template-wire--free .wire-row-d{grid-column:1/7}
        .post-template-wire--three .wire-img-a{grid-column:1/5;grid-row:3/8}.post-template-wire--three .wire-img-b{grid-column:5/7;grid-row:3/5}.post-template-wire--three .wire-img-c{grid-column:5/7;grid-row:5/8}.post-template-wire--three .wire-row-a,.post-template-wire--three .wire-row-b,.post-template-wire--three .wire-row-c,.post-template-wire--three .wire-row-d,.post-template-wire--three .wire-row-e{grid-column:1/7}
        .post-template-wire--report .wire-img-a{grid-column:1/5;grid-row:3/8}.post-template-wire--report .wire-img-b{grid-column:5/7;grid-row:3/5}.post-template-wire--report .wire-img-c{grid-column:5/7;grid-row:5/8}.post-template-wire--report .wire-row-a{grid-column:1/4}.post-template-wire--report .wire-row-b{grid-column:4/7}
        .post-template-wire--announcement .wire-title{grid-column:1/6;grid-row:2}.post-template-wire--announcement .wire-lead{grid-column:1/7;grid-row:4/6}.post-template-wire--announcement .wire-button{grid-column:1/4;grid-row:8}
        .post-template-wire--qa .wire-img-a{grid-column:1/3;grid-row:3/7}.post-template-wire--qa .wire-row-a,.post-template-wire--qa .wire-row-b,.post-template-wire--qa .wire-row-c,.post-template-wire--qa .wire-row-d{grid-column:3/7}
        .post-template-wire--timeline .wire-img-a{grid-column:1/7;grid-row:3/6}.post-template-wire--timeline .wire-row-a,.post-template-wire--timeline .wire-row-b,.post-template-wire--timeline .wire-row-c,.post-template-wire--timeline .wire-row-d{grid-column:1/7}
        .post-template-wire--compare .wire-img-a{grid-column:1/4;grid-row:3/8}.post-template-wire--compare .wire-img-b{grid-column:4/7;grid-row:3/8}.post-template-wire--compare .wire-row-a{grid-column:1/4}.post-template-wire--compare .wire-row-b{grid-column:4/7}
        .post-template-wire--profile .wire-img-a{grid-column:1/3;grid-row:3/8;border-radius:999px}.post-template-wire--profile .wire-quote{grid-column:3/7;grid-row:3/6}.post-template-wire--profile .wire-row-a,.post-template-wire--profile .wire-row-b{grid-column:3/7}.post-template-wire--profile .wire-button{grid-column:3/5}
        .post-template-wire--quote .wire-quote{grid-column:1/7;grid-row:3/7}.post-template-wire--quote .wire-img-a{grid-column:1/4;grid-row:8/11}.post-template-wire--quote .wire-row-a,.post-template-wire--quote .wire-row-b{grid-column:4/7}
      `}</style>
      <div className="post-template-grid">
        {newsPostTemplates.map((template) => {
          const selected = value === template.id || (!value && template.id === "free");

          return (
            <button
              key={template.id}
              type="button"
              className="post-template-card"
              data-selected={selected}
              onClick={() => onChange(PatchEvent.from(template.id ? set(template.id) : unset()))}
            >
              <Wireframe template={template} />
              <div>
                <strong>{template.title}</strong>
                <p>{template.description}</p>
              </div>
              <div className="post-template-meta">
                <span><b>Când îl folosești:</b> {template.bestFor}</span>
                <span><b>Structură:</b> {template.structure}</span>
                <span><b>Imagini:</b> {template.imageHint}</span>
                <span><b>Text:</b> {template.textHint}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
