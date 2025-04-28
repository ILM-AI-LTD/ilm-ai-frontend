import Footer from '@/components/global/Footer'
import SmartToolsSection from '@/feature/landing/components/SmartTools/SmartToolsSection'
import FAQSection from '@/feature/landing/components/faq/FAQSection'
import GettingStartedSection from '@/feature/landing/components/gettingStarted/GettingStartedSection'
import HeroSection from '@/feature/landing/components/hero/HeroSection'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <SmartToolsSection />
      <GettingStartedSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default LandingPage