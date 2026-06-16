import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Главный экран',
  type: 'document',
  fields: [
    defineField({ name: 'titleRo', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'titleRu', title: 'Заголовок (копия для сайта)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitleRo', title: 'Подзаголовок', type: 'text', rows: 3 }),
    defineField({ name: 'subtitleRu', title: 'Подзаголовок (копия для сайта)', type: 'text', rows: 3 }),
    defineField({ name: 'buttonTextRo', title: 'Текст кнопки', type: 'string' }),
    defineField({ name: 'buttonTextRu', title: 'Текст кнопки (копия для сайта)', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Ссылка кнопки', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Фоновое изображение',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
})
