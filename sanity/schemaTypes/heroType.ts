import { defineArrayMember, defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Главный экран',
  type: 'document',
  fields: [
    defineField({ name: 'titleRo', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'titleRu', title: 'Заголовок (копия для сайта)', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitleRo', title: 'Подзаголовок', type: 'text', rows: 3 }),
    defineField({ name: 'subtitleRu', title: 'Подзаголовок (копия для сайта)', type: 'text', rows: 3 }),
    defineField({ name: 'locationText', title: 'Текст локации', type: 'string', initialValue: 'Московская область · бесплатный выезд' }),
    defineField({
      name: 'benefits',
      title: 'Преимущества',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Текст', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'icon',
              title: 'Иконка',
              type: 'string',
              options: {
                list: [
                  { title: 'Щит', value: 'shield' },
                  { title: 'Договор', value: 'file' },
                  { title: 'Камера', value: 'camera' },
                  { title: 'Галочка', value: 'badge' },
                ],
              },
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'buttonTextRo', title: 'Текст кнопки', type: 'string', initialValue: 'Оставить заявку' }),
    defineField({ name: 'buttonTextRu', title: 'Текст кнопки (копия для сайта)', type: 'string', initialValue: 'Оставить заявку' }),
    defineField({ name: 'buttonLink', title: 'Ссылка кнопки', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Фоновое изображение',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoUrl',
      title: 'Логотип',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
