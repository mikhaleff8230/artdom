import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectHero } from "@/components/ProjectHero"
import { ProjectInfo } from "@/components/ProjectInfo"
import { ProjectGallery } from "@/components/ProjectGallery"
import { RelatedProjects } from "@/components/RelatedProjects"
import { getProjectDetailById, getRelatedProjectDetails, type ProjectDetail } from "@/data/projects"
import { getProjectPageById, getRelatedProjectPages, type CmsProjectPage } from "@/lib/sanity"

export const revalidate = 0

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

const mapCmsToProjectDetail = (project: CmsProjectPage): ProjectDetail => ({
  id: project.projectId,
  title: { ru: project.titleRu },
  images: project.gallery,
  description: { ru: project.overviewRu },
  category: project.projectType,
  location: { ru: project.locationRu },
  year: project.year,
  details: {
    type: {
      ru:
        project.projectType === "house"
          ? "Дом из бруса"
          : project.projectType === "commercial"
            ? "Постройки участка"
            : "Каркасный дом",
    },
    size: project.area,
    scope: { ru: project.scopeRu },
    status: { ru: project.status === "completed" ? "Завершен" : "В работе" },
  },
})

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const cmsProject = await getProjectPageById(id)

  const project = cmsProject ? mapCmsToProjectDetail(cmsProject) : getProjectDetailById(id)
  if (!project) {
    notFound()
  }

  const relatedCms = cmsProject ? await getRelatedProjectPages(cmsProject.projectId, cmsProject.projectType) : []
  const related = relatedCms.length
    ? relatedCms.map(mapCmsToProjectDetail)
    : getRelatedProjectDetails(project.id, project.category)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectHero project={project} />
      <ProjectInfo project={project} />
      <ProjectGallery images={project.images} title={project.title} />
      <RelatedProjects projects={related} />
      <Footer />
    </main>
  )
}
