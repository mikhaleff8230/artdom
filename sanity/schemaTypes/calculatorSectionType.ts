import { defineField, defineType } from 'sanity'

export const calculatorSectionType = defineType({
  name: 'calculatorSection',
  title: 'Блок «Расчет стоимости»',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Метка секции', type: 'string', initialValue: 'Расчет стоимости' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3 }),
    defineField({ name: 'tipText', title: 'Текст подсказки', type: 'text', rows: 3 }),
    defineField({ name: 'buttonLabel', title: 'Текст кнопки формы', type: 'string', initialValue: 'Отправить фото дома' }),
    defineField({
      name: 'logoUrl',
      title: 'Логотип',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
