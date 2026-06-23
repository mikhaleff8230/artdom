import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const landingTypes = [
  'hero',
  'navigation',
  'problems',
  'portfolioSection',
  'servicesSection',
  'statsSection',
  'about',
  'calculatorSection',
  'testimonialsSection',
  'faqSection',
  'ctaSection',
  'footer',
  'features',
]

const singleton = (S: StructureBuilder, schemaType: string, title: string, documentId: string) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('WOOD TREABO')
    .items([
      S.listItem()
        .title('Главная страница')
        .child(
          S.list()
            .title('Главная страница')
            .items([
              singleton(S, 'navigation', 'Навигация', 'navigation.main'),
              singleton(S, 'hero', 'Главный экран', 'hero.main'),
              singleton(S, 'problems', 'Блок «Проблема»', 'problems.main'),
              singleton(S, 'portfolioSection', 'Блок «Портфолио»', 'portfolioSection.main'),
              singleton(S, 'servicesSection', 'Блок «Услуги»', 'servicesSection.main'),
              singleton(S, 'statsSection', 'Блок «Почему мы»', 'statsSection.main'),
              singleton(S, 'about', 'Блок «О компании»', 'about.main'),
              singleton(S, 'calculatorSection', 'Блок «Расчет»', 'calculatorSection.main'),
              singleton(S, 'testimonialsSection', 'Блок «Отзывы»', 'testimonialsSection.main'),
              singleton(S, 'faqSection', 'Блок «FAQ»', 'faqSection.main'),
              singleton(S, 'ctaSection', 'Блок «CTA»', 'ctaSection.main'),
              singleton(S, 'footer', 'Подвал', 'footer.main'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('projectPage').title('Страницы проектов'),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !landingTypes.includes(item.getId()!) && item.getId() !== 'projectPage',
      ),
    ])
