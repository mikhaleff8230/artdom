import { defineArrayMember, defineField, defineType } from 'sanity'

export const servicesSectionType = defineType({
  name: 'servicesSection',
  title: 'Блок «Услуги»',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Метка секции услуг',
      type: 'string',
      initialValue: 'Услуги',
    }),
    defineField({ name: 'title', title: 'Заголовок услуг', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Описание услуг', type: 'text', rows: 3 }),
    defineField({
      name: 'items',
      title: 'Карточки услуг',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Название', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'backgroundImage',
              title: 'Фоновое изображение (URL)',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'processBadge', title: 'Метка процесса', type: 'string', initialValue: 'Процесс' }),
    defineField({ name: 'processTitle', title: 'Заголовок процесса', type: 'string', initialValue: 'Простой и понятный процесс' }),
    defineField({
      name: 'processSteps',
      title: 'Шаги процесса',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'pricesBadge', title: 'Метка цен', type: 'string', initialValue: 'Цены' }),
    defineField({ name: 'pricesTitle', title: 'Заголовок цен', type: 'string', initialValue: 'Ориентировочная стоимость' }),
    defineField({ name: 'pricesDescription', title: 'Описание цен', type: 'text', rows: 2 }),
    defineField({
      name: 'prices',
      title: 'Цены',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Название', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'price', title: 'Стоимость', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
  ],
})
