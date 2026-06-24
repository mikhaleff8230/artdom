import { defineField, defineType } from 'sanity'

export const projectPageType = defineType({
  name: 'projectPage',
  title: 'Страница проекта',
  type: 'document',
  fields: [
    defineField({
      name: 'projectId',
      title: 'ID проекта для /project/[id]',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRo',
      title: 'Название проекта',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRu',
      title: 'Название проекта (копия для сайта)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationRo',
      title: 'Локация',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationRu',
      title: 'Локация (копия для сайта)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Тип',
      type: 'string',
      options: {
        list: [
          { title: 'Каркасный дом', value: 'apartment' },
          { title: 'Дом из бруса', value: 'house' },
          { title: 'Постройки участка', value: 'commercial' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Год',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overviewRo',
      title: 'Описание проекта',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overviewRu',
      title: 'Описание проекта (копия для сайта)',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Площадь',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scopeRo',
      title: 'Объем работ',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scopeRu',
      title: 'Объем работ (копия для сайта)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Завершен', value: 'completed' },
          { title: 'В работе', value: 'in-progress' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея проекта (URL изображений)',
      type: 'array',
      of: [{ type: 'url' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
