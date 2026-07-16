import { defineField, defineType } from "sanity";

export const newsAuthor = defineType({
  name: "newsAuthor",
  title: "Noutăți · Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume autor",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Adresă autor",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / funcție",
      type: "string",
      description: "Ex: Autor oficial, voluntar, coordonator proiect, fotograf.",
      validation: (Rule) => Rule.max(90),
    }),
    defineField({
      name: "image",
      title: "Poză autor",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Text alternativ",
          type: "string",
          validation: (Rule) => Rule.required().warning("Recomandat pentru accesibilitate."),
        }),
      ],
    }),
    defineField({
      name: "shortBio",
      title: "Scurtă descriere",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: "isOfficial",
      title: "Autor oficial Arta în dar",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "visible",
      title: "Vizibil pe site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Ordine afișare",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || "Autor noutăți",
      };
    },
  },
});
