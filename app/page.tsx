import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { CalculatorSection } from "@/components/calculator-section"
import { StatsSection } from "@/components/stats-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsGeoSection } from "@/components/testimonials-geo-section"
import { getHomepageContent } from "@/lib/sanity"

export default async function HomePage() {
  const content = await getHomepageContent()

  return (
    <main className="min-h-screen">
      <Navigation content={content.navigation} />
      <HeroSection content={content.hero} />
      <FeaturesSection content={content.problems} />
      <PortfolioSection content={content.portfolioSection} projects={content.portfolioProjects} />
      <ServicesSection content={content.servicesSection} />
      <StatsSection content={content.statsSection} />
      <AboutSection content={content.about} />
      <CalculatorSection content={content.calculatorSection} />
      <TestimonialsGeoSection content={content.testimonialsSection} />
      <FAQSection content={content.faqSection} />
      <CTASection content={content.ctaSection} />
      <Footer content={content.footer} />
    </main>
  )
}
