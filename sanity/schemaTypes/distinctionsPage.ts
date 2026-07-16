import { defineField, defineType } from "sanity";

export const distinctionsPage = defineType({
  name: "distinctionsPage",
  title: "Distincții · Setări pagină",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO · Titlu",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO · Descriere",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero · Etichetă mică",
      type: "string",
      initialValue: "Semne de recunoaștere",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero · Titlu principal",
      type: "string",
      initialValue: "Distincții",
    }),
    defineField({
      name: "heroAccent",
      title: "Hero · Text accent",
      type: "string",
      initialValue: "gravate în timp.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero · Descriere",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coinLabel",
      title: "Medalion · Text mic",
      type: "string",
      initialValue: "Arta în dar",
    }),
    defineField({
      name: "coinYears",
      title: "Medalion · Ani",
      type: "string",
      initialValue: "2024—2026",
    }),
    defineField({
      name: "ledgerEyebrow",
      title: "Registru · Etichetă mică",
      type: "string",
      initialValue: "Registru de onoare",
    }),
    defineField({
      name: "ledgerTitle",
      title: "Registru · Titlu",
      type: "string",
      initialValue: "Recunoaștere care nu închide povestea,",
    }),
    defineField({
      name: "ledgerAccent",
      title: "Registru · Accent",
      type: "string",
      initialValue: "o obligă să continue.",
    }),
    defineField({
      name: "galleryEmptyTitle",
      title: "Galerie goală · Titlu",
      type: "string",
      initialValue: "Distincțiile vor fi adăugate din Sanity.",
    }),
    defineField({
      name: "galleryEmptyDescription",
      title: "Galerie goală · Descriere",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "finaleEyebrow",
      title: "Final · Etichetă mică",
      type: "string",
      initialValue: "Dincolo de medalie",
    }),
    defineField({
      name: "finaleTitle",
      title: "Final · Titlu",
      type: "string",
      initialValue: "Cea mai importantă distincție rămâne",
    }),
    defineField({
      name: "finaleAccent",
      title: "Final · Accent",
      type: "string",
      initialValue: "încrederea comunității.",
    }),
    defineField({
      name: "finaleDescription",
      title: "Final · Descriere",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Setări pagină Distincții",
        subtitle: "Texte hero, registru, galerie și final",
      };
    },
  },
});
