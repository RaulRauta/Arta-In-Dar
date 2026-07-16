import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Despre noi · Membru",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Strat",
      type: "reference",
      to: [{ type: "teamGroup" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Poză",
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
      name: "shortDescription",
      title: "Descriere scurtă pe card",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bio",
      title: "Text pentru modal",
      type: "text",
      rows: 8,
      description:
        "Textul scris de persoana respectivă despre ea. Poți separa paragrafele cu Enter.",
    }),
    defineField({
      name: "quote",
      title: "Citat personal",
      type: "text",
      rows: 3,
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
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});

