import { defineArrayMember, defineField, defineType } from 'sanity'

export const problemsType = defineType({
  name: 'problems',
  title: 'Блок «Проблема»',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Метка секции',
      type: 'string',
      initialValue: 'Проблема',
    }),
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Карточки',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Текст карточки',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Фоновое изображение (URL)',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', media: 'backgroundImage' },
          },
        }),
      ],
    }),
  ],
})
