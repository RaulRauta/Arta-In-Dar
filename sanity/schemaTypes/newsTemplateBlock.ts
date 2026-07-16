import { defineField, defineType } from "sanity";

const templatePresets = [
  { name: "newsTemplateIntroImage", title: "01 · Introducere cu imagine laterală", preset: "introImage" },
  { name: "newsTemplateGalleryStory", title: "02 · Galerie comentată", preset: "galleryStory" },
  { name: "newsTemplateImageTextImage", title: "03 · Imagine · text · imagine", preset: "imageTextImage" },
  { name: "newsTemplateJournal", title: "04 · Jurnal / cronologie scurtă", preset: "journal" },
  { name: "newsTemplateQuoteContext", title: "05 · Citat cu context", preset: "quoteContext" },
  { name: "newsTemplateAnnouncement", title: "06 · Anunț scurt", preset: "announcement" },
  { name: "newsTemplatePhotoReport", title: "07 · Reportaj foto", preset: "photoReport" },
  { name: "newsTemplateQa", title: "08 · Întrebare și răspuns", preset: "qa" },
  { name: "newsTemplateLandmarks", title: "09 · Repere / idei-cheie", preset: "landmarks" },
  { name: "newsTemplateClosingCta", title: "10 · Final cu invitație", preset: "closingCta" },
] as const;

export const newsTemplateTypeNames = templatePresets.map((preset) => preset.name);

const textHeavyPresets = ["introImage", "imageTextImage", "journal", "announcement", "qa", "landmarks", "closingCta"];
const secondaryTextPresets = ["imageTextImage", "journal", "qa", "landmarks"];
const imagePresets = ["introImage", "galleryStory", "imageTextImage", "photoReport", "closingCta"];
const quotePresets = ["quoteContext"];
const linkPresets = ["announcement", "closingCta"];

function templateFields(lockedPreset?: string) {
  return [
    defineField({
      name: "preset",
      title: lockedPreset ? "Tip șablon selectat" : "Alege tipul de șablon",
      type: "string",
      readOnly: Boolean(lockedPreset),
      hidden: Boolean(lockedPreset),
      options: {
        layout: "radio",
        list: templatePresets.map((preset) => ({ title: preset.title, value: preset.preset })),
      },
      initialValue: lockedPreset || "introImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Etichetă mică",
      type: "string",
      description: "Ex: Din teren, Pe scurt, Jurnal, Voce din comunitate.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "title",
      title: "Titlu secțiune",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "text",
      title: "Text principal",
      type: "text",
      rows: 5,
      hidden: ({ parent }) => !textHeavyPresets.includes(lockedPreset || parent?.preset),
      validation: (Rule) => Rule.max(900),
    }),
    defineField({
      name: "secondaryText",
      title: "Text secundar",
      type: "text",
      rows: 4,
      hidden: ({ parent }) => !secondaryTextPresets.includes(lockedPreset || parent?.preset),
      validation: (Rule) => Rule.max(700),
    }),
    defineField({
      name: "quote",
      title: "Citat",
      type: "text",
      rows: 4,
      hidden: ({ parent }) => !quotePresets.includes(lockedPreset || parent?.preset),
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "quoteAuthor",
      title: "Autor citat",
      type: "string",
      hidden: ({ parent }) => !quotePresets.includes(lockedPreset || parent?.preset),
      validation: (Rule) => Rule.max(90),
    }),
    defineField({
      name: "images",
      title: "Imagini",
      type: "array",
      hidden: ({ parent }) => !imagePresets.includes(lockedPreset || parent?.preset),
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
      validation: (Rule) => Rule.max(8).warning("Pentru pagini rapide, ideal folosim maximum 8 imagini într-un șablon."),
    }),
    defineField({
      name: "items",
      title: "Rânduri / repere",
      type: "array",
      hidden: ({ parent }) => !["journal", "qa", "landmarks"].includes(lockedPreset || parent?.preset),
      of: [
        defineField({
          name: "item",
          title: "Rând",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etichetă", type: "string", validation: (Rule) => Rule.max(60) }),
            defineField({ name: "title", title: "Titlu", type: "string", validation: (Rule) => Rule.max(100) }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (Rule) => Rule.max(360) }),
          ],
          preview: {
            select: { title: "title", subtitle: "label" },
            prepare({ title, subtitle }) {
              return { title: title || "Rând șablon", subtitle };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: "linkLabel",
      title: "Text buton",
      type: "string",
      hidden: ({ parent }) => !linkPresets.includes(lockedPreset || parent?.preset),
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "linkHref",
      title: "Link buton",
      type: "string",
      description: "Poate fi link intern, de exemplu /contact, sau link extern.",
      hidden: ({ parent }) => !linkPresets.includes(lockedPreset || parent?.preset),
    }),
  ];
}

export const newsTemplateBlock = defineType({
  name: "newsTemplateBlock",
  title: "Șablon editorial · selector",
  type: "object",
  fields: templateFields(),
  preview: {
    select: {
      title: "title",
      preset: "preset",
      media: "images.0",
    },
    prepare({ title, preset, media }) {
      return {
        title: title || "Șablon editorial",
        subtitle: `Tip: ${preset || "introImage"}`,
        media,
      };
    },
  },
});

export const newsTemplatePresetBlocks = templatePresets.map((preset) =>
  defineType({
    name: preset.name,
    title: preset.title,
    type: "object",
    initialValue: { preset: preset.preset },
    fields: templateFields(preset.preset),
    preview: {
      select: {
        title: "title",
        media: "images.0",
      },
      prepare({ title, media }) {
        return {
          title: title || preset.title,
          subtitle: "Șablon editorial",
          media,
        };
      },
    },
  }),
);
