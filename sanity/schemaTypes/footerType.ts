import { defineArrayMember, defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Подвал сайта',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Название бренда', type: 'string', initialValue: 'WOOD TREABO' }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3 }),
    defineField({ name: 'sectionsTitle', title: 'Заголовок «Разделы»', type: 'string', initialValue: 'Разделы' }),
    defineField({
      name: 'sectionLinks',
      title: 'Ссылки разделов',
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
    defineField({ name: 'contactsTitle', title: 'Заголовок «Контакты»', type: 'string', initialValue: 'Контакты' }),
    defineField({ name: 'locationText', title: 'Текст локации', type: 'string', initialValue: 'Московская область' }),
    defineField({ name: 'copyright', title: 'Копирайт', type: 'string' }),
  ],
})
