import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'О мастере',
  type: 'document',
  fields: [
    defineField({ name: 'titleRo', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'titleRu', title: 'Заголовок (копия для сайта)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'descriptionRo', title: 'Описание', type: 'text', rows: 4 }),
    defineField({ name: 'descriptionRu', title: 'Описание (копия для сайта)', type: 'text', rows: 4 }),
    defineField({
      name: 'image',
      title: 'Фото',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
})
