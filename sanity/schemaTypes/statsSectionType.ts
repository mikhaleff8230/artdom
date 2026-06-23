import { defineArrayMember, defineField, defineType } from 'sanity'

export const statsSectionType = defineType({
  name: 'statsSection',
  title: 'Блок «Почему выбирают нас»',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Метка секции', type: 'string', initialValue: 'Почему выбирают нас' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'items',
      title: 'Пункты',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
