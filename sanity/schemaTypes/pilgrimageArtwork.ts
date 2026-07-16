import { defineField, defineType } from "sanity";

export const pilgrimageArtwork = defineType({
  name: "pilgrimageArtwork",
  title: "7 Capele · Sculptură / Basorelief",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlul lucrării",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Tip lucrare",
      type: "string",
      initialValue: "sculptura",
      options: {
        layout: "radio",
        list: [
          { title: "Sculptură", value: "sculptura" },
          { title: "Basorelief", value: "basorelief" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Autor / artist",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Poză lucrare",
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
      title: "Descriere / poveste scurtă",
      type: "text",
      rows: 6,
      description:
        "Textul care apare în fișa lucrării. Poți separa paragrafele cu Enter.",
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
      artist: "artist",
      type: "type",
      media: "image",
    },
    prepare({ title, artist, type }) {
      const label = type === "basorelief" ? "Basorelief" : "Sculptură";

      return {
        title,
        subtitle: `${label} · ${artist || "Autor necompletat"}`,
      };
    },
  },
});
