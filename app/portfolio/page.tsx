import PortfolioClientPage from './portfolio-client'
import { projects as fallbackProjects, type Project } from '@/data/projects'
import { getPortfolioProjectPages } from '@/lib/sanity'

export const revalidate = 0

function mapCmsProjectToPortfolioProject(cmsProject: Awaited<ReturnType<typeof getPortfolioProjectPages>>[number]): Project {
  const firstImage = cmsProject.gallery?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop'

  return {
    id: cmsProject.projectId,
    titleRo: cmsProject.titleRo,
    titleRu: cmsProject.titleRu,
    descriptionRo: cmsProject.overviewRo,
    descriptionRu: cmsProject.overviewRu,
    fullDescriptionRo: cmsProject.overviewRo,
    fullDescriptionRu: cmsProject.overviewRu,
    locationRo: cmsProject.locationRo,
    locationRu: cmsProject.locationRu,
    locationFullRo: cmsProject.locationRo,
    locationFullRu: cmsProject.locationRu,
    image: firstImage,
    gallery: cmsProject.gallery || [firstImage],
    category: cmsProject.projectType,
    status: cmsProject.status,
    year: cmsProject.year,
  }
}

export default async function PortfolioPage() {
  const cmsProjects = await getPortfolioProjectPages()
  const projects = cmsProjects.length ? cmsProjects.map(mapCmsProjectToPortfolioProject) : fallbackProjects

  return <PortfolioClientPage projects={projects} />
}
