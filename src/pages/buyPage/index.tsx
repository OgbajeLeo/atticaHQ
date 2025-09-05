import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import FAQSection from "../landingPage/FAQ";
import PropertyListingPage from "./PropertyListingPage";

const BuyPage = () => {
  return (
    <div className="">
      <Navbar />
      <PropertyListingPage />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default BuyPage;
