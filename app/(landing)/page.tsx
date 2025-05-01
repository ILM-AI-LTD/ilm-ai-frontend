import Footer from '@/components/global/Footer'
import SmartToolsSection from '@/feature/landing/components/SmartTools/SmartToolsSection'
import CompetitionSection from '@/feature/landing/components/competition/CompetitionSection'
import CustomerService from '@/feature/landing/components/customerService/CustomerService'
import FAQSection from '@/feature/landing/components/faq/FAQSection'
import GettingStartedSection from '@/feature/landing/components/gettingStarted/GettingStartedSection'
import HeroSection from '@/feature/landing/components/hero/HeroSection'
import ReviewSection from '@/feature/landing/components/reviews/ReviewSection'
import SubjectCoverSection from '@/feature/landing/components/subjectCover/SubjectCoverSection'
import SubscriptionSection from '@/feature/landing/components/subscription/SubscriptionSection'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <SmartToolsSection />
      <SubjectCoverSection />
      <GettingStartedSection />
      <SubscriptionSection />
      <FAQSection />
      <CompetitionSection />
      <ReviewSection />
      <CustomerService />
      <Footer />
    </div>
  )
}

export default LandingPage