import IntroSection from "../components/homepage/IntroSection";
import CoreFeaturesSection from "../components/homepage/CoreFeaturesSection";
import Faq from "@/components/homepage/Faq.tsx";
import Contact from "@/components/homepage/Contact.tsx";

export const PageHome = () => {
  return (
    <>
      <IntroSection />
      <CoreFeaturesSection />
      <Faq />
      <Contact />
    </>
  );
};
