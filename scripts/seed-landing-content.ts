import { getCliClient } from 'sanity/cli'

async function seedLandingContent() {
  const client = getCliClient({ apiVersion: '2025-01-01' })

  await client.createOrReplace({
    _id: 'hero.main',
    _type: 'hero',
    titleRo: 'Покраска деревянных и каркасных домов под ключ в Московской области',
    titleRu: 'Покраска деревянных и каркасных домов под ключ в Московской области',
    subtitleRo: 'Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.',
    subtitleRu: 'Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.',
    buttonTextRo: 'Отправить фото дома',
    buttonTextRu: 'Отправить фото дома',
    buttonLink: '#raschet',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop',
  })

  await client.createOrReplace({
    _id: 'features.main',
    _type: 'features',
    titleRo: 'Почему выбирают ArtDom',
    titleRu: 'Почему выбирают ArtDom',
    descriptionRo: 'Подготовка, материалы и покраска под ключ.',
    descriptionRu: 'Подготовка, материалы и покраска под ключ.',
    items: [
      {
        _key: 'feature1',
        titleRo: 'Работа по договору',
        titleRu: 'Работа по договору',
        descriptionRo: 'Фиксируем объем работ, сроки и ответственность.',
        descriptionRu: 'Фиксируем объем работ, сроки и ответственность.',
        icon: 'leaf',
      },
      {
        _key: 'feature2',
        titleRo: 'Материалы под дом',
        titleRu: 'Материалы под дом',
        descriptionRo: 'Подбираем систему окраски под состояние древесины.',
        descriptionRu: 'Подбираем систему окраски под состояние древесины.',
        icon: 'wrench',
      },
      {
        _key: 'feature3',
        titleRo: 'Фотоотчет этапов',
        titleRu: 'Фотоотчет этапов',
        descriptionRo: 'Показываем подготовку, нанесение слоев и итог.',
        descriptionRu: 'Показываем подготовку, нанесение слоев и итог.',
        icon: 'handshake',
      },
    ],
  })

  await client.createOrReplace({
    _id: 'about.main',
    _type: 'about',
    titleRo: 'О мастере',
    titleRu: 'О мастере',
    descriptionRo: 'Александр занимается покраской деревянных домов более 10 лет и лично отвечает за результат на каждом объекте.',
    descriptionRu: 'Александр занимается покраской деревянных домов более 10 лет и лично отвечает за результат на каждом объекте.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop',
  })

  console.log('Seed completed. Upserted ArtDom hero, features and about documents.')
}

seedLandingContent().catch((error) => {
  console.error(error)
  process.exit(1)
})
