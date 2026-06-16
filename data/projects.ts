export type ProjectCategory = "apartment" | "house" | "commercial"
export type LocalizedValue = { ru: string }

export interface Project {
  id: string
  titleRo: string
  titleRu: string
  descriptionRo: string
  descriptionRu: string
  fullDescriptionRo: string
  fullDescriptionRu: string
  locationRo: string
  locationRu: string
  locationFullRo: string
  locationFullRu: string
  image: string
  gallery: string[]
  category: ProjectCategory
  status: "completed" | "in-progress"
  year: string
}

export interface ProjectDetail {
  id: string
  title: { ru: string }
  images: string[]
  description: { ru: string }
  category: ProjectCategory
  location: { ru: string }
  year: string
  details: {
    type: { ru: string }
    size: string
    scope: { ru: string }
    status: { ru: string }
  }
}

const houseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
]

const gallery = (start: number) => [
  houseImages[start % houseImages.length],
  houseImages[(start + 1) % houseImages.length],
  houseImages[(start + 2) % houseImages.length],
  houseImages[(start + 3) % houseImages.length],
  houseImages[(start + 4) % houseImages.length],
]

export const projects: Project[] = [
  {
    id: "1",
    titleRo: "Каркасный дом в Истре",
    titleRu: "Каркасный дом в Истре",
    descriptionRo: "Шлифовка фасада, антисептик и покраска в два слоя.",
    descriptionRu: "Шлифовка фасада, антисептик и покраска в два слоя.",
    fullDescriptionRo: "Обновили фасад каркасного дома после выгорания старого покрытия. Провели шлифовку, обработку торцов и покраску профессиональной укрывной системой.",
    fullDescriptionRu: "Обновили фасад каркасного дома после выгорания старого покрытия. Провели шлифовку, обработку торцов и покраску профессиональной укрывной системой.",
    locationRo: "Истра",
    locationRu: "Истра",
    locationFullRo: "Истринский район, Московская область",
    locationFullRu: "Истринский район, Московская область",
    image: houseImages[0],
    gallery: gallery(0),
    category: "apartment",
    status: "completed",
    year: "2025",
  },
  {
    id: "2",
    titleRo: "Дом из бруса на Новой Риге",
    titleRu: "Дом из бруса на Новой Риге",
    descriptionRo: "Восстановление потемневшего дерева и защитная окраска.",
    descriptionRu: "Восстановление потемневшего дерева и защитная окраска.",
    fullDescriptionRo: "Фасад из бруса потерял цвет на солнечной стороне. Мы сняли рыхлый слой, выровняли поверхность и нанесли защитную лазурь с сохранением фактуры дерева.",
    fullDescriptionRu: "Фасад из бруса потерял цвет на солнечной стороне. Мы сняли рыхлый слой, выровняли поверхность и нанесли защитную лазурь с сохранением фактуры дерева.",
    locationRo: "Новая Рига",
    locationRu: "Новая Рига",
    locationFullRo: "Новорижское направление",
    locationFullRu: "Новорижское направление",
    image: houseImages[1],
    gallery: gallery(1),
    category: "house",
    status: "completed",
    year: "2025",
  },
  {
    id: "3",
    titleRo: "Дача в Волоколамске",
    titleRu: "Дача в Волоколамске",
    descriptionRo: "Покраска фасада, наличников и террасы.",
    descriptionRu: "Покраска фасада, наличников и террасы.",
    fullDescriptionRo: "Комплексно обновили дачный дом: фасад, декоративные элементы, открытая терраса. Работы выполнили с фотоотчетом каждого этапа.",
    fullDescriptionRu: "Комплексно обновили дачный дом: фасад, декоративные элементы, открытая терраса. Работы выполнили с фотоотчетом каждого этапа.",
    locationRo: "Волоколамск",
    locationRu: "Волоколамск",
    locationFullRo: "Волоколамский район",
    locationFullRu: "Волоколамский район",
    image: houseImages[2],
    gallery: gallery(2),
    category: "commercial",
    status: "completed",
    year: "2024",
  },
  {
    id: "4",
    titleRo: "Коттедж в Рузе",
    titleRu: "Коттедж в Рузе",
    descriptionRo: "Шлифовка, грунтование и окраска фасада 240 м².",
    descriptionRu: "Шлифовка, грунтование и окраска фасада 240 м².",
    fullDescriptionRo: "На объекте была старая выгоревшая краска и локальные трещины. Подготовили основание, усилили проблемные зоны и нанесли два финишных слоя.",
    fullDescriptionRu: "На объекте была старая выгоревшая краска и локальные трещины. Подготовили основание, усилили проблемные зоны и нанесли два финишных слоя.",
    locationRo: "Руза",
    locationRu: "Руза",
    locationFullRo: "Рузский городской округ",
    locationFullRu: "Рузский городской округ",
    image: houseImages[3],
    gallery: gallery(3),
    category: "house",
    status: "completed",
    year: "2024",
  },
  {
    id: "5",
    titleRo: "Баня и забор в Шаховской",
    titleRu: "Баня и забор в Шаховской",
    descriptionRo: "Покраска бани, забора и хозяйственного блока.",
    descriptionRu: "Покраска бани, забора и хозяйственного блока.",
    fullDescriptionRo: "Подобрали единый цвет для построек на участке, обновили баню, забор и хозяйственный блок. Работы выполнили за одну рабочую неделю.",
    fullDescriptionRu: "Подобрали единый цвет для построек на участке, обновили баню, забор и хозяйственный блок. Работы выполнили за одну рабочую неделю.",
    locationRo: "Шаховская",
    locationRu: "Шаховская",
    locationFullRo: "Шаховская, Московская область",
    locationFullRu: "Шаховская, Московская область",
    image: houseImages[4],
    gallery: gallery(4),
    category: "commercial",
    status: "completed",
    year: "2024",
  },
  {
    id: "6",
    titleRo: "Дом с имитацией бруса в Можайске",
    titleRu: "Дом с имитацией бруса в Можайске",
    descriptionRo: "Обновление фасада и подбор стойкой системы окраски.",
    descriptionRu: "Обновление фасада и подбор стойкой системы окраски.",
    fullDescriptionRo: "Имитация бруса требовала аккуратной шлифовки и ровного нанесения в стыках. Защитили дерево от влаги и ультрафиолета.",
    fullDescriptionRu: "Имитация бруса требовала аккуратной шлифовки и ровного нанесения в стыках. Защитили дерево от влаги и ультрафиолета.",
    locationRo: "Можайск",
    locationRu: "Можайск",
    locationFullRo: "Можайский городской округ",
    locationFullRu: "Можайский городской округ",
    image: houseImages[5],
    gallery: gallery(5),
    category: "apartment",
    status: "completed",
    year: "2023",
  },
]

export const getProjectById = (id: string): Project | undefined => projects.find((project) => project.id === id)

export const projectDetails: ProjectDetail[] = projects.map((project) => ({
  id: project.id,
  title: { ru: project.titleRu },
  images: [project.image, ...project.gallery],
  description: { ru: project.fullDescriptionRu },
  category: project.category,
  location: { ru: project.locationFullRu },
  year: project.year,
  details: {
    type: {
      ru: project.category === "house" ? "Дом из бруса" : project.category === "commercial" ? "Постройки участка" : "Каркасный дом",
    },
    size: project.id === "4" ? "240 м²" : project.id === "2" ? "180 м²" : project.id === "5" ? "120 м²" : "160 м²",
    scope: {
      ru: project.id === "3" ? "Фасад, наличники, терраса" : "Шлифовка, обработка, покраска",
    },
    status: { ru: project.status === "completed" ? "Завершен" : "В работе" },
  },
}))

export const getProjectDetailById = (id: string): ProjectDetail | undefined =>
  projectDetails.find((project) => project.id === id)

export const getRelatedProjectDetails = (currentProjectId: string, category: ProjectCategory): ProjectDetail[] =>
  projectDetails
    .filter((project) => project.id !== currentProjectId && project.category === category)
    .concat(projectDetails.filter((project) => project.id !== currentProjectId && project.category !== category))
    .slice(0, 3)
