import { defineArrayMember, defineField, defineType } from 'sanity'

export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'Блок «FAQ»',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Метка секции', type: 'string', initialValue: 'Вопросы' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'items',
      title: 'Вопросы и ответы',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Вопрос', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Ответ', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
