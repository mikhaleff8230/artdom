import { defineArrayMember, defineField, defineType } from 'sanity'

export const testimonialsSectionType = defineType({
  name: 'testimonialsSection',
  title: 'Блок «Отзывы и география»',
  type: 'document',
  fields: [
    defineField({ name: 'reviewsBadge', title: 'Метка отзывов', type: 'string', initialValue: 'Отзывы' }),
    defineField({ name: 'reviewsTitle', title: 'Заголовок отзывов', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'reviews',
      title: 'Отзывы',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Имя и локация', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Текст отзыва', type: 'text', rows: 3, validation: (rule) => rule.required() }),
            defineField({ name: 'image', title: 'Фото (URL)', type: 'url', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: 'geoBadge', title: 'Метка географии', type: 'string', initialValue: 'География' }),
    defineField({ name: 'geoTitle', title: 'Заголовок географии', type: 'string' }),
    defineField({ name: 'geoDescription', title: 'Описание географии', type: 'text', rows: 3 }),
    defineField({
      name: 'locations',
      title: 'Населённые пункты',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})
