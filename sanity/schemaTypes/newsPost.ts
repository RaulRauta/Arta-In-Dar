import { defineField, defineType } from "sanity";
import { PostTemplateInput } from "../components/post-template-input";
import { newsPostTemplateOptions } from "../news-post-templates";

export const newsPost = defineType({
  name: "newsPost",
  title: "Noutăți",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu articol",
      type: "string",
      validation: (Rule) => Rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Adresă pagină",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Eveniment", value: "Eveniment" },
          { title: "Voluntariat", value: "Voluntariat" },
          { title: "7 Capele", value: "7 Capele" },
          { title: "Atelier", value: "Atelier" },
          { title: "Comunitate", value: "Comunitate" },
          { title: "Anunț", value: "Anunț" },
        ],
      },
      initialValue: "Comunitate",
    }),
    defineField({
      name: "author",
      title: "Voce principală",
      type: "reference",
      to: [{ type: "newsAuthor" }],
      description: "Autorul principal al articolului. Pentru articole oficiale, selectează Arta în dar.",
    }),
    defineField({
      name: "coAuthors",
      title: "Acompaniament",
      type: "array",
      of: [{ type: "reference", to: [{ type: "newsAuthor" }] }],
      description: "Co-autori, fotografi, colaboratori sau oameni care au contribuit la articol.",
    }),
    defineField({
      name: "cardTitle",
      title: "Titlu card",
      type: "string",
      description: "Dacă rămâne gol, folosim titlul articolului.",
      validation: (Rule) => Rule.max(90),
    }),
    defineField({
      name: "cardSummary",
      title: "Text scurt pe card",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "cardStyle",
      title: "Stil card",
      type: "string",
      options: {
        list: [
          { title: "Partitură deschisă", value: "score" },
          { title: "Afiș de concert", value: "poster" },
          { title: "Notă pe hârtie", value: "note" },
          { title: "Fotografie de arhivă", value: "photo" },
        ],
      },
      initialValue: "score",
    }),
    defineField({
      name: "cardImage",
      title: "Imagine card",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Text alternativ",
          type: "string",
          validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate și SEO."),
        }),
      ],
    }),
    defineField({
      name: "lead",
      title: "Introducere articol",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(420),
    }),
    defineField({
      name: "heroImage",
      title: "Imagine principală articol",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Text alternativ",
          type: "string",
          validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate și SEO."),
        }),
      ],
    }),
    defineField({
      name: "postTemplate",
      title: "Tip de postare",
      type: "string",
      description:
        "Alege un format prestabilit pentru articol. Când alegi un tip, completezi câmpurile structurate de mai jos, nu construiești manual articolul din blocuri.",
      options: {
        list: newsPostTemplateOptions,
      },
      components: {
        input: PostTemplateInput,
      },
      initialValue: "free",
    }),
    defineField({
      name: "templateEyebrow",
      title: "⬛ Etichetă mică",
      type: "string",
      description: "Etichetă discretă deasupra titlului. Nu apare ca zonă mare în preview.",
      hidden: ({ document }) => !document?.postTemplate || document.postTemplate === "free",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "templateTitle",
      title: "🟩 Titlu șablon",
      type: "string",
      description: "Corespunde zonei verzi din preview. Dacă rămâne gol, folosim titlul articolului.",
      hidden: ({ document }) => !document?.postTemplate || document.postTemplate === "free",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "templateIntro",
      title: "🟨 Introducere șablon",
      type: "text",
      description: "Corespunde zonei aurii din preview. Aici pui contextul scurt al postării.",
      rows: 4,
      hidden: ({ document }) => !document?.postTemplate || document.postTemplate === "free",
      validation: (Rule) => Rule.max(650),
    }),
    defineField({
      name: "templateImages",
      title: "🟧 Imagini șablon",
      type: "array",
      description: "Corespunde zonelor portocalii din preview. Aici adaugi pozele care vor intra în layout.",
      hidden: ({ document }) => !document?.postTemplate || document.postTemplate === "free",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Text alternativ",
              type: "string",
              validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate și SEO."),
            }),
            defineField({ name: "caption", title: "Legendă", type: "string" }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: "templateRows",
      title: "🟦 Rânduri / momente / întrebări",
      type: "array",
      description: "Corespunde zonelor albastre din preview. Aici completezi bucățile scurte de text, momentele sau întrebările.",
      hidden: ({ document }) => !document?.postTemplate || document.postTemplate === "free",
      of: [
        defineField({
          name: "row",
          title: "Rând",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etichetă", type: "string", validation: (Rule) => Rule.max(60) }),
            defineField({ name: "title", title: "Titlu", type: "string", validation: (Rule) => Rule.max(100) }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4, validation: (Rule) => Rule.max(520) }),
          ],
          preview: {
            select: { title: "title", subtitle: "label" },
            prepare({ title, subtitle }) {
              return { title: title || "Rând de postare", subtitle };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(14),
    }),
    defineField({
      name: "templateQuote",
      title: "🟪 Citat central",
      type: "text",
      description: "Corespunde zonei mov din preview. Folosește un citat scurt și memorabil.",
      rows: 4,
      hidden: ({ document }) => !["quoteFeature", "profileStory"].includes(String(document?.postTemplate)),
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "templateQuoteAuthor",
      title: "🟪 Autor citat",
      type: "string",
      description: "Numele persoanei sau sursei pentru citatul mov.",
      hidden: ({ document }) => !["quoteFeature", "profileStory"].includes(String(document?.postTemplate)),
      validation: (Rule) => Rule.max(90),
    }),
    defineField({
      name: "templateCtaLabel",
      title: "🟥 Text buton șablon",
      type: "string",
      description: "Corespunde zonei roșii din preview. Textul scurt de pe buton.",
      hidden: ({ document }) => !["shortAnnouncement", "profileStory"].includes(String(document?.postTemplate)),
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "templateCtaHref",
      title: "🟥 Link buton șablon",
      type: "string",
      description: "Destinația butonului roșu: pagină internă, formular sau link extern.",
      hidden: ({ document }) => !["shortAnnouncement", "profileStory"].includes(String(document?.postTemplate)),
    }),
    defineField({
      name: "content",
      title: "Conținut articol",
      description: "Folosește acest câmp doar dacă Tip de postare este „Liber”. Pentru șabloane prestabilite, completează câmpurile de mai sus.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subtitlu", value: "h2" },
            { title: "Intertitlu", value: "h3" },
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Listă simplă", value: "bullet" },
            { title: "Listă numerotată", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Îngroșat", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [defineField({ name: "href", title: "Adresă", type: "url" })],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Text alternativ",
              type: "string",
              validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate și SEO."),
            }),
            defineField({ name: "caption", title: "Legendă", type: "string" }),
          ],
        },
      ],
      hidden: ({ document }) => Boolean(document?.postTemplate && document.postTemplate !== "free"),
    }),
    defineField({
      name: "gallery",
      title: "Galerie opțională",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Text alternativ",
              type: "string",
              validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate și SEO."),
            }),
            defineField({ name: "caption", title: "Legendă", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaLabel", title: "Text buton opțional", type: "string" }),
    defineField({
      name: "ctaHref",
      title: "Link buton opțional",
      type: "string",
      description: "Poate fi link intern, de exemplu /contact, sau link extern.",
    }),
    defineField({ name: "featured", title: "Noutate principală", type: "boolean", initialValue: false }),
    defineField({ name: "visible", title: "Vizibil pe site", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Ordine manuală", type: "number", initialValue: 100 }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cardImage",
    },
  },
});
