import { defineField, defineType } from "sanity";

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
      fields: [defineField({ name: "alt", title: "Text alternativ", type: "string" })],
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
      fields: [defineField({ name: "alt", title: "Text alternativ", type: "string" })],
    }),
    defineField({
      name: "content",
      title: "Conținut articol",
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
            defineField({ name: "alt", title: "Text alternativ", type: "string" }),
            defineField({ name: "caption", title: "Legendă", type: "string" }),
          ],
        },
      ],
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
            defineField({ name: "alt", title: "Text alternativ", type: "string" }),
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
