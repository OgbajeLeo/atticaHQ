import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AlertCircle } from "lucide-react";
import handshake from "../../assets/contactHandshake.webp";
import PhoneIcon from "../../components/iconComponent/PhoneIcon";
import ChatIcon from "../../components/iconComponent/ChatIcon";
import MsgIcon from "../../components/iconComponent/MsgIcon";
interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const ContactUI: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
console.log(formData, "formData")
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block border border-gray_text1 text-gray_text2 text-[15px] px-4 py-2 rounded-xl mb-2">
            Contact Us
          </div>
          <h1 className="text-3xl md:text-[37px] font-bold text-gray_text3 mb-2">
            Contact Our Friendly Team
          </h1>
          <p className="text-[22px] text-gray_text2 max-w-md mx-auto">
            Let us know how we can help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left side - Handshake Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src={handshake}
              alt="handshake"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl lg:text-[26px] font-bold text-gray_text3 mb-2">
              Get in Touch With Us
            </h2>
            <p className="text-gray_text2 mb-8 text-lg">
              Kindly fill in your details so we can reach you back!
            </p>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
              >
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-green-700 font-medium">
                  Message sent successfully! We'll get back to you soon.
                </span>
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-lg font-semibold text-gray_text3 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-4 bg-[#FAFAFA] border outline-none rounded-xl focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200 text-gray_text3 placeholder-gray-500 ${
                      errors.fullName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center space-x-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.fullName}</span>
                  </motion.div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray_text3 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="strongestAvenger@example.com"
                    className={`w-full pl-12 pr-4 py-4 bg-[#FAFAFA] border outline-none rounded-xl focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200 text-gray_text3 placeholder-gray-500 ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center space-x-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </motion.div>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold text-gray_text3 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Type in your message here..."
                  className={`w-full px-4 py-4 outline-none bg-[#FAFAFA] border rounded-xl focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200 resize-none text-gray_text3 placeholder-gray-500 ${
                    errors.message
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center space-x-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.message}</span>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-primary_color active:bg-primary_color text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </motion.button>

              {/* Terms */}
              <p className="text-sm text-gray-500 text-center leading-relaxed -mt-4">
                By contacting us, you accept our{" "}
                <a
                  href="#"
                  className="text-primary_color font-bold underline underline-offset-2"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary_color font-bold underline underline-offset-2"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Send Mail */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className=" bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md text-left transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-red-50 border-2 border-accent text-accent rounded-xl flex items-center justify-center  mb-6">
              <MsgIcon />
            </div>
            <h3 className="text-xl lg:text-[26px] font-bold text-black mb-2">
              Send Us a Mail
            </h3>
            <p className="text-gray_text2 text-base lg:text-lg mb-4 leading-relaxed">
              We're always happy to help.
            </p>
            <a
              href="mailto:contact@atticahq.com"
              className="text-accent font-semibold text-lg underline underline-offset-4 decoration-2 transition-colors duration-200"
            >
              contact@atticahq.com
            </a>
          </motion.div>

          {/* Call Us */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-left  bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-red-50 border-2 border-accent rounded-xl flex items-center justify-center  mb-6">
              <PhoneIcon />
            </div>
            <h3 className="text-xl lg:text-[26px] font-bold text-black mb-2">
              Call Us
            </h3>
            <p className="text-gray_text2 text-base lg:text-lg mb-4 leading-relaxed">
              Speak to our friendly team.
            </p>
            <a
              href="tel:+2348137209801"
              className="text-accent font-semibold text-lg underline underline-offset-4 decoration-2 transition-colors duration-200"
            >
              +2348137209801
            </a>
          </motion.div>

          {/* Live Chat */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-left  bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-12 h-12 bg-red-50 border-2 border-accent rounded-xl flex items-center justify-center  mb-6">
              <ChatIcon />
            </div>
            <h3 className="text-xl lg:text-[26px] font-bold text-black mb-2">
              Live Chat
            </h3>
            <p className="text-gray_text2 text-base lg:text-lg mb-4 leading-relaxed">
              Speak to our friendly team.
            </p>
            <button
              onClick={() => window.open("tel:+2348137209801")}
              className="text-accent font-semibold text-lg underline underline-offset-4 decoration-2 transition-colors duration-200"
            >
              +2348137209801
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUI;
