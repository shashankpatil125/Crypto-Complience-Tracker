import ModernNavbar from "@/components/landingPageComponents/NavbarLPComponent";
import HeroSectionComponent from "@/components/landingPageComponents/HeroSectionComponent";
import StatisticsComponent from "@/components/landingPageComponents/StatisticsComponent";
import FeaturesSectionComponent from "@/components/landingPageComponents/FeaturesSectionComponent";
import ServiceCategoriesComponent from "@/components/landingPageComponents/ServiceCategoriesComponent";
import WhyChooseDARAComponent from "@/components/landingPageComponents/WhyChooseDARAComponent";
import FinalCTAComponent from "@/components/landingPageComponents/FinalCTAComponent";
import FooterComponent from "@/components/landingPageComponents/FooterComponent";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernNavbar />
      <HeroSectionComponent />
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <StatisticsComponent />
        </div>
      </div>
      <FeaturesSectionComponent />
      <ServiceCategoriesComponent />
      <WhyChooseDARAComponent />
      <FinalCTAComponent />
      <FooterComponent />
    </div>
  );
}