import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import Banner from "../landingPage/Banner";
import FAQSection from "../landingPage/FAQ";
import FeaturedProperties from "../landingPage/FeaturedProperty";
import PropertyServices from "../landingPage/PropertyService";
import HeroSection from "./HeroSection";
import Mission from "./Mission";

const AboutPage = () => {
  return (
    <div>
          <Navbar />
          <HeroSection />
      <Mission />
      <PropertyServices />
      {/* <AboutUI /> */}
      <FeaturedProperties />

      <Banner />

      <FAQSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
