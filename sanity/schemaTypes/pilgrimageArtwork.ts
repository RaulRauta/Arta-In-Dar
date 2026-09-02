import { defineField, defineType } from "sanity";

export const pilgrimageArtwork = defineType({
  name: "pilgrimageArtwork",
  title: "7 Capele · Lucrări de artă",
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
          { title: "Pictură murală", value: "picturaMurala" },
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
          validation: (rule) => rule.required().warning("Recomandat pentru accesibilitate."),
        }),
      ],
    }),
    defineField({
      name: "galleryPreset",
      title: "Preset galerie detaliu",
      type: "string",
      initialValue: "auto",
      description:
        "Controlează forma colajului din modal. Imaginea principală rămâne folosită pentru card.",
      options: {
        layout: "dropdown",
        list: [
          { title: "Auto — după numărul de poze", value: "auto" },
          { title: "2 poze — dialog", value: "duo" },
          { title: "3 poze — triptic", value: "triptych" },
          { title: "4 poze — cadran iregular", value: "quad" },
          { title: "5 poze — colaj deschis", value: "mosaicFive" },
          { title: "6 poze — atelier", value: "mosaicSix" },
          { title: "7 poze — jurnal complet", value: "mosaicSeven" },
        ],
      },
    }),
    defineField({
      name: "gallery",
      title: "Galerie suplimentară pentru detaliu",
      type: "array",
      description:
        "Adaugă până la 7 poze pentru modal. Poza principală rămâne separată pentru card și nu intră automat în colaj.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Text alternativ",
              type: "string",
              description: "Descriere scurtă pentru accesibilitate.",
              validation: (rule) =>
                rule.required().warning("Recomandat pentru accesibilitate."),
            }),
            defineField({
              name: "caption",
              title: "Legendă scurtă",
              type: "string",
              description: "Opțional. Apare discret peste imagine în modal.",
            }),
          ],
        },
      ],
      validation: (rule) =>
        rule.max(7).warning("Folosește maximum 7 poze în galeria de detaliu."),
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
      const label =
        type === "basorelief"
          ? "Basorelief"
          : type === "picturaMurala"
            ? "Pictură murală"
            : "Sculptură";

      return {
        title,
        subtitle: `${label} · ${artist || "Autor necompletat"}`,
      };
    },
  },
});
