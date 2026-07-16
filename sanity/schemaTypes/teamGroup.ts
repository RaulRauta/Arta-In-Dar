import { defineField, defineType } from "sanity";

export const teamGroup = defineType({
  name: "teamGroup",
  title: "Despre noi · Strat",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu strat",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "material",
      title: "Material vizual",
      type: "string",
      initialValue: "calcar",
      options: {
        layout: "radio",
        list: [
          { title: "Calcar", value: "calcar" },
          { title: "Piatră", value: "piatra" },
          { title: "Teracotă", value: "teracota" },
          { title: "Lemn", value: "lemn" },
          { title: "Bronz", value: "bronz" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Număr / marcaj",
      type: "string",
      description: "Exemple: I, II, III, IV sau 01.",
    }),
    defineField({
      name: "description",
      title: "Descriere scurtă",
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
      title: "title",
      subtitle: "material",
    },
  },
});

