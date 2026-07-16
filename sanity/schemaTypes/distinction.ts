import { defineField, defineType } from "sanity";

export const distinction = defineType({
  name: "distinction",
  title: "Distincții · Distincție",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlul distincției",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "An",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Context / categorie",
      type: "string",
      description: "Ex: Gala Județeană a Voluntarilor Băcăuani",
    }),
    defineField({
      name: "tone",
      title: "Stil vizual card",
      type: "string",
      initialValue: "gold",
      options: {
        layout: "radio",
        list: [
          { title: "Auriu / medalion", value: "gold" },
          { title: "Bronz / plachetă", value: "bronze" },
          { title: "Hârtie / diplomă", value: "paper" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Imagine / design distincție",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Text alternativ",
          type: "string",
          description: "Descriere scurtă pentru accesibilitate.",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Descriere / prezentare",
      type: "text",
      rows: 7,
      description:
        "Textul care apare în modal. Poți separa paragrafele cu Enter.",
    }),
    defineField({
      name: "order",
      title: "Ordine afișare",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "visible",
      title: "Vizibil pe site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "image",
    },
  },
});
