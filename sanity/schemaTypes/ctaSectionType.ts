import { defineField, defineType } from 'sanity'

export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Блок «Призыв к действию»',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3 }),
    defineField({ name: 'buttonText', title: 'Текст кнопки WhatsApp', type: 'string', initialValue: 'Отправить фото дома' }),
  ],
})
