import { defineField, defineType } from 'sanity'

export const portfolioSectionType = defineType({
  name: 'portfolioSection',
  title: 'Блок «Портфолио»',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Метка секции', type: 'string', initialValue: 'Результаты наших работ' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Описание', type: 'text', rows: 3 }),
    defineField({ name: 'buttonText', title: 'Текст кнопки', type: 'string', initialValue: 'Смотреть все проекты' }),
    defineField({ name: 'areaLabel', title: 'Подпись «Площадь»', type: 'string', initialValue: 'Площадь' }),
    defineField({ name: 'durationLabel', title: 'Подпись «Срок»', type: 'string', initialValue: 'Срок' }),
    defineField({ name: 'paintLabel', title: 'Подпись «Краска»', type: 'string', initialValue: 'Краска' }),
    defineField({ name: 'viewDetailsText', title: 'Текст «Подробнее»', type: 'string', initialValue: 'Подробнее' }),
  ],
})
