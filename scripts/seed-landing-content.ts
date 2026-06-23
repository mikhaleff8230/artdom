import { getCliClient } from 'sanity/cli'

const problemImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472592-401b289b3584?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
]

const serviceImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472592-401b289b3584?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f8d404420?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600210492496-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=800&auto=format&fit=crop',
]

const aboutImages = [
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
]

async function seedLandingContent() {
  const client = getCliClient({ apiVersion: '2025-01-01' })

  await client.createOrReplace({
    _id: 'navigation.main',
    _type: 'navigation',
    brandName: 'WOOD TREABO',
    items: [
      { _key: 'n1', label: 'Услуги', href: '/#uslugi' },
      { _key: 'n2', label: 'Работы', href: '/#raboty' },
      { _key: 'n3', label: 'Процесс', href: '/#process' },
      { _key: 'n4', label: 'Расчет', href: '/#raschet' },
    ],
    ctaButtonText: 'Оставить заявку',
    leadDialogTitle: 'Сделайте расчет покраски дома уже сейчас',
    leadDialogDescription: 'Заполните форму, выберите удобный мессенджер и прикрепите фотографии дома после отправки.',
  })

  await client.createOrReplace({
    _id: 'hero.main',
    _type: 'hero',
    titleRo: 'Покраска деревянных и каркасных домов под ключ в Московской области',
    titleRu: 'Покраска деревянных и каркасных домов под ключ в Московской области',
    subtitleRo: 'Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.',
    subtitleRu: 'Шлифовка, обработка и покраска фасадов. Работаем без посредников. Бесплатный выезд и расчет стоимости.',
    locationText: 'Московская область · бесплатный выезд',
    benefits: [
      { _key: 'b1', label: 'Более 10 лет опыта', icon: 'shield' },
      { _key: 'b2', label: 'Работа по договору', icon: 'file' },
      { _key: 'b3', label: 'Фотоотчет каждого этапа', icon: 'camera' },
      { _key: 'b4', label: 'Гарантия на выполненные работы', icon: 'badge' },
    ],
    buttonTextRo: 'Оставить заявку',
    buttonTextRu: 'Оставить заявку',
    buttonLink: '#raschet',
    image: '/hero-house-design.jpg',
    logoUrl: '/wood-treabo-logo.png',
  })

  await client.createOrReplace({
    _id: 'problems.main',
    _type: 'problems',
    badge: 'Проблема',
    title: 'Ваш дом потерял внешний вид?',
    description: 'Своевременная покраска защищает дом на долгие годы и сохраняет его стоимость.',
    items: [
      { _key: 'p1', title: 'Старая краска выгорает', backgroundImage: problemImages[0] },
      { _key: 'p2', title: 'Дерево темнеет и сереет', backgroundImage: problemImages[1] },
      { _key: 'p3', title: 'Появляются трещины', backgroundImage: problemImages[2] },
      { _key: 'p4', title: 'Фасад теряет привлекательность', backgroundImage: problemImages[3] },
      { _key: 'p5', title: 'Повышается риск разрушения древесины', backgroundImage: problemImages[4] },
    ],
  })

  await client.createOrReplace({
    _id: 'portfolioSection.main',
    _type: 'portfolioSection',
    badge: 'Результаты наших работ',
    title: 'До и после покраски',
    description: 'В карточках проекта указаны площадь, срок выполнения и использованная система окраски.',
    buttonText: 'Смотреть все проекты',
    areaLabel: 'Площадь',
    durationLabel: 'Срок',
    paintLabel: 'Краска',
    viewDetailsText: 'Подробнее',
  })

  await client.createOrReplace({
    _id: 'servicesSection.main',
    _type: 'servicesSection',
    badge: 'Услуги',
    title: 'Что мы красим',
    description: 'Деревянные фасады, элементы участка и малые постройки под ключ.',
    items: [
      { _key: 's1', title: 'Каркасные дома', backgroundImage: serviceImages[0] },
      { _key: 's2', title: 'Дома из бруса', backgroundImage: serviceImages[1] },
      { _key: 's3', title: 'Имитацию бруса', backgroundImage: serviceImages[2] },
      { _key: 's4', title: 'Планкен', backgroundImage: serviceImages[3] },
      { _key: 's5', title: 'Бани', backgroundImage: serviceImages[4] },
      { _key: 's6', title: 'Террасы', backgroundImage: serviceImages[5] },
      { _key: 's7', title: 'Беседки', backgroundImage: serviceImages[6] },
      { _key: 's8', title: 'Заборы', backgroundImage: serviceImages[7] },
      { _key: 's9', title: 'Хозяйственные постройки', backgroundImage: serviceImages[8] },
    ],
    processBadge: 'Процесс',
    processTitle: 'Простой и понятный процесс',
    processSteps: [
      'Вы отправляете фото дома',
      'Получаете предварительную оценку',
      'Выезд на объект',
      'Подготовка поверхности',
      'Покраска в несколько слоев',
      'Сдача объекта',
    ],
    pricesBadge: 'Цены',
    pricesTitle: 'Ориентировочная стоимость',
    pricesDescription: 'Точная стоимость зависит от состояния поверхности и рассчитывается после осмотра.',
    prices: [
      { _key: 'pr1', title: 'Покраска фасада', price: 'от 350 ₽/м²' },
      { _key: 'pr2', title: 'Шлифовка + покраска', price: 'от 650 ₽/м²' },
      { _key: 'pr3', title: 'Террасы', price: 'от 400 ₽/м²' },
      { _key: 'pr4', title: 'Заборы', price: 'от 300 ₽/м²' },
    ],
  })

  await client.createOrReplace({
    _id: 'statsSection.main',
    _type: 'statsSection',
    badge: 'Почему выбирают нас',
    title: 'Отвечаем за объект от первого осмотра до сдачи',
    items: [
      'Работаем без посредников',
      'Не привлекаем случайных рабочих',
      'Соблюдаем сроки',
      'Используем профессиональные материалы',
      'Подбираем систему окраски под конкретный дом',
      'Всегда остаемся на связи',
    ],
  })

  await client.createOrReplace({
    _id: 'about.main',
    _type: 'about',
    label: 'Наша компания в лицах',
    heading: 'Здравствуйте. Меня зовут Александр.',
    paragraphs: [
      'Я занимаюсь покраской деревянных домов более 10 лет.',
      'Лично участвую в каждом объекте и отвечаю за результат.',
      'Для меня важно не просто покрасить дом, а сделать работу так, чтобы она служила долгие годы.',
    ],
    images: aboutImages,
    legalText: 'работаем по договору, Наши реквизиты: ООО "САНКЭН" ОГРН 1220100001263',
  })

  await client.createOrReplace({
    _id: 'calculatorSection.main',
    _type: 'calculatorSection',
    badge: 'Расчет стоимости',
    title: 'Сделайте расчет покраски дома уже сейчас',
    description: 'Предварительно считаем по фото в течение 15 минут. Точную смету фиксируем после бесплатного осмотра объекта.',
    tipText: 'Укажите удобный мессенджер для связи. После заявки мы уточним детали и попросим 2-4 фотографии фасада с разных сторон.',
    buttonLabel: 'Отправить фото дома',
    logoUrl: '/wood-treabo-logo.png',
  })

  await client.createOrReplace({
    _id: 'testimonialsSection.main',
    _type: 'testimonialsSection',
    reviewsBadge: 'Отзывы',
    reviewsTitle: 'Что говорят клиенты',
    reviews: [
      {
        _key: 'r1',
        name: 'Ирина, Истра',
        text: 'Дом заметно посветлел уже после шлифовки, а после покраски выглядит как новый. Все этапы присылали фото.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
      },
      {
        _key: 'r2',
        name: 'Сергей, Новая Рига',
        text: 'Понравилось, что Александр сам приехал, объяснил по материалам и дал понятную смету без скрытых доплат.',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
      },
      {
        _key: 'r3',
        name: 'Ольга, Волоколамск',
        text: 'Красили фасад и террасу. Сроки выдержали, участок после работ оставили чистым.',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop',
      },
    ],
    geoBadge: 'География',
    geoTitle: 'Работаем по западным направлениям Московской области',
    geoDescription: 'Выезжаем на осмотр, оцениваем состояние фасада и подбираем систему окраски под ваш дом.',
    locations: ['Шаховская', 'Волоколамск', 'Новопетровское', 'Руза', 'Можайск', 'Истра', 'Новая Рига'],
  })

  await client.createOrReplace({
    _id: 'faqSection.main',
    _type: 'faqSection',
    badge: 'Вопросы',
    title: 'Часто спрашивают',
    items: [
      {
        _key: 'f1',
        question: 'Можно ли посчитать стоимость по фото?',
        answer: 'Да. По фото мы даем предварительный диапазон, а точную стоимость фиксируем после осмотра поверхности.',
      },
      {
        _key: 'f2',
        question: 'Вы работаете со своей краской или можно купить самому?',
        answer: 'Можем работать с вашим материалом, но обычно подбираем систему сами, чтобы отвечать за результат.',
      },
      {
        _key: 'f3',
        question: 'Сколько занимает покраска дома?',
        answer: 'Обычный фасад занимает от 4 до 10 рабочих дней. Срок зависит от площади, высоты, состояния дерева и погоды.',
      },
      {
        _key: 'f4',
        question: 'В каких районах работаете?',
        answer: 'Шаховская, Волоколамск, Новопетровское, Руза, Можайск, Истра, Новая Рига и соседние направления.',
      },
    ],
  })

  await client.createOrReplace({
    _id: 'ctaSection.main',
    _type: 'ctaSection',
    title: 'Получите расчет стоимости уже сегодня',
    description: 'Отправьте фотографию дома в WhatsApp и получите предварительный расчет в течение 15 минут.',
    buttonText: 'Отправить фото дома',
  })

  await client.createOrReplace({
    _id: 'footer.main',
    _type: 'footer',
    brandName: 'WOOD TREABO',
    description: 'Покраска деревянных и каркасных домов под ключ в Московской области. Шлифовка, обработка, покраска, фотоотчет и гарантия.',
    sectionsTitle: 'Разделы',
    sectionLinks: [
      { _key: 'l1', label: 'Услуги', href: '/#uslugi' },
      { _key: 'l2', label: 'Работы', href: '/#raboty' },
      { _key: 'l3', label: 'Процесс', href: '/#process' },
      { _key: 'l4', label: 'Все проекты', href: '/portfolio' },
    ],
    contactsTitle: 'Контакты',
    locationText: 'Московская область',
    copyright: '© 2026 WOOD TREABO. Все права защищены.',
  })

  console.log('Seed completed. Upserted all homepage sections.')
}

seedLandingContent().catch((error) => {
  console.error(error)
  process.exit(1)
})
