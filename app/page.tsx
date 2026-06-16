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
import { getAbout, getFeatures, getHero } from "@/lib/sanity"

export default async function HomePage() {
  const [hero, features, about] = await Promise.all([getHero(), getFeatures(), getAbout()])

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection content={hero} />
      <FeaturesSection content={features} />
      <PortfolioSection />
      <ServicesSection />
      <StatsSection />
      <AboutSection content={about} />
      <CalculatorSection />
      <TestimonialsGeoSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
