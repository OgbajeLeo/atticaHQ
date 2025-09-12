import Footer from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import FAQSection from "../landingPage/FAQ";
import ContactUI from "./ContactForm"

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <ContactUI />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default ContactPage