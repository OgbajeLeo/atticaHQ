import Navbar from "../../components/shared/Navbar"
import Banner from "./Banner";
import FAQSection from "./FAQ";
import Hero from "./HeroSection"
import PropertyListings from "./PropertyListing";
import PropertyServices from "./PropertyService";

const index = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <PropertyServices />
      <PropertyListings />
      <Banner />
      <FAQSection />
    </div>
  );
}

export default index