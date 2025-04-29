import Footer from '@/components/global/Footer'
import SmartToolsSection from '@/feature/landing/components/smartTools/SmartToolsSection'
import FAQSection from '@/feature/landing/components/faq/FAQSection'
import GettingStartedSection from '@/feature/landing/components/gettingStarted/GettingStartedSection'
import HeroSection from '@/feature/landing/components/hero/HeroSection'
import SubscriptionSection from '@/feature/landing/components/subscription/SubscriptionSection'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <SmartToolsSection />
      <GettingStartedSection />
      <FAQSection />
      <SubscriptionSection />
      <Footer />
    </div>
  )
}

export default LandingPage