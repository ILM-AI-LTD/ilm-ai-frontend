import Footer from '@/components/global/Footer'
import CompetitionSection from '@/feature/landing/components/competition/CompetitionSection'
import CustomerService from '@/feature/landing/components/customerService/CustomerService'
import FAQSection from '@/feature/landing/components/faq/FAQSection'
import TestimonialMarquee from '@/feature/landing/components/faq/test'
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
      <TestimonialMarquee />
      <CustomerService />
      <Footer />
    </div>
  )
}

export default LandingPage