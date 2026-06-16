import { defineArrayMember, defineField, defineType } from 'sanity'

export const featuresType = defineType({
  name: 'features',
  title: 'Преимущества',
  type: 'document',
  fields: [
    defineField({ name: 'titleRo', title: 'Заголовок секции', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'titleRu', title: 'Заголовок секции (копия для сайта)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'descriptionRo', title: 'Описание секции', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionRu', title: 'Описание секции (копия для сайта)', type: 'text', rows: 3 }),
    defineField({
      name: 'items',
      title: 'Пункты',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'titleRo', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'titleRu', title: 'Заголовок (копия для сайта)', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'descriptionRo', title: 'Описание', type: 'text', rows: 3 }),
            defineField({ name: 'descriptionRu', title: 'Описание (копия для сайта)', type: 'text', rows: 3 }),
            defineField({ name: 'icon', title: 'Ключ иконки', type: 'string' }),
            defineField({ name: 'iconImage', title: 'Изображение иконки', type: 'image', options: { hotspot: true } }),
          ],
        }),
      ],
    }),
  ],
})
