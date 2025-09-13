import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import FeaturedProperties from "../landingPage/FeaturedProperty";
import PropertyListingPage from "./PropertyListingPage";

const RentPage = () => {
  return (
    <div className="">
      <Navbar />
      <PropertyListingPage />
      <FeaturedProperties />

      <Footer />
    </div>
  );
};

export default RentPage;
