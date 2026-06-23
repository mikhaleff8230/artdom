import { defineArrayMember, defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Навигация',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Название бренда', type: 'string', initialValue: 'WOOD TREABO' }),
    defineField({
      name: 'items',
      title: 'Пункты меню',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Текст', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'href', title: 'Ссылка', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: 'ctaButtonText', title: 'Текст кнопки заявки', type: 'string', initialValue: 'Оставить заявку' }),
    defineField({ name: 'leadDialogTitle', title: 'Заголовок формы', type: 'string' }),
    defineField({ name: 'leadDialogDescription', title: 'Описание формы', type: 'text', rows: 2 }),
  ],
})
