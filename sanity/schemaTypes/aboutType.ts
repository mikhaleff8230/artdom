import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'Блок «О компании»',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Метка секции',
      type: 'string',
      initialValue: 'Наша компания в лицах',
    }),
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Абзацы текста',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Фото для слайдера (URL)',
      type: 'array',
      of: [defineArrayMember({ type: 'url' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'legalText',
      title: 'Текст внизу секции',
      type: 'text',
      rows: 2,
    }),
    // legacy fields kept for backward compatibility
    defineField({ name: 'titleRo', title: 'Заголовок (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'titleRu', title: 'Заголовок legacy RU', type: 'string', hidden: true }),
    defineField({ name: 'descriptionRo', title: 'Описание (legacy)', type: 'text', rows: 4, hidden: true }),
    defineField({ name: 'descriptionRu', title: 'Описание legacy RU', type: 'text', rows: 4, hidden: true }),
    defineField({ name: 'image', title: 'Фото (legacy)', type: 'url', hidden: true }),
  ],
})
