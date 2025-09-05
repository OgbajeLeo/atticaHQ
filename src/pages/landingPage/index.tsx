import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar"
import Banner from "./Banner";
import FAQSection from "./FAQ";
import FeaturedProperties from "./FeaturedProperty";
import Hero from "./HeroSection"
import PropertyListings from "./PropertyListing";
import PropertyServices from "./PropertyService";

const index = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <PropertyListings />
      <Banner />
      <PropertyServices />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default index