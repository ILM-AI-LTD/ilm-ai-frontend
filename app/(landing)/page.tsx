import Footer from '@/components/global/Footer'
import CompetitionSection from '@/feature/landing/components/competition/CompetitionSection'
import FAQSection from '@/feature/landing/components/faq/FAQSection'
import GettingStartedSection from '@/feature/landing/components/gettingStarted/GettingStartedSection'
import HeroSection from '@/feature/landing/components/hero/HeroSection'
import SmartToolsSection from '@/feature/landing/components/smartTools/SmartToolsSection'
import FeatureDiagram from '@/feature/landing/components/subjectCover/SubjectCoverSection'
import SubscriptionSection from '@/feature/landing/components/subscription/SubscriptionSection'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <SmartToolsSection />
      <FeatureDiagram />
      <GettingStartedSection />
      <SubscriptionSection />
      <FAQSection />
      <CompetitionSection />
      <Footer />
    </div>
  )
}

export default LandingPage