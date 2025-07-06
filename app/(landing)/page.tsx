import Footer from "@/components/global/Footer";
import SmartToolsSection from "@/feature/landing/components/SmartTools/SmartToolsSection";
import CompetitionSection from "@/feature/landing/components/competition/CompetitionSection";
import CustomerService from "@/feature/landing/components/customerService/CustomerService";
import WellfareSection from "@/feature/landing/components/wellfare/WellfareSection";
import FAQSection from "@/feature/landing/components/faq/FAQSection";
import GettingStartedSection from "@/feature/landing/components/gettingStarted/GettingStartedSection";
// import HeroSection from "@/feature/landing/components/hero/HeroSection";
import ReviewSection from "@/feature/landing/components/reviews/ReviewSection";
import SubjectCoverSection from "@/feature/landing/components/subjectCover/SubjectCoverSection";
import SubscriptionSection from "@/feature/landing/components/subscription/SubscriptionSection";
import HeroSectionv2 from "@/feature/landing/components/hero/HeroSectionv2";

const LandingPage = () => {
  return (
    <div>
      <HeroSectionv2 />
      <SmartToolsSection />
      <SubjectCoverSection />
      <GettingStartedSection />
      <SubscriptionSection />
      <FAQSection />
      <CompetitionSection />
      <ReviewSection />
      <WellfareSection />
      <CustomerService />
      <Footer />
    </div>
  );
};

export default LandingPage;
