import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import Banner from "../landingPage/Banner";
import FeaturedProperties from "../landingPage/FeaturedProperty";
import PropertyListing from "./PropertyOverview";

const PropertyOverviewPage = () => {
  return (
    <div>
      <Navbar />
      <PropertyListing />
      <FeaturedProperties />
      <Banner />
      <Footer />
    </div>
  );
};

export default PropertyOverviewPage;
