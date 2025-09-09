import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What exactly does this platform help me with?",
      answer:
        "We support you through every phase. From your first period to pregnancy, postpartum healing, and beyond. Think of us as your digital wellness bestie.",
    },
    {
      question: "Is my health data safe and private?",
      answer:
        "Absolutely. Your health data is encrypted and protected. We will never share your personal information without your consent.",
    },
    {
      question: "Does the app work offline?",
      answer:
        "Not at the moment. Because MyLurah offers real-time support and personalised content, an internet connection is needed to access most features. But we’re working on ways to make parts of the app more accessible offline in the future.",
    },
    {
      question: "Can I use the app if I'm not trying to get pregnant?",
      answer:
        "Yes, 100%. MyLurah supports you whether you’re tracking your cycle, managing conditions like fibroids or PCOS, or just staying in tune with your body.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-[20px] lg:text-[36px] font-bold text-primary_color1 text-center mt-10">
        Frequently Asked Questions
      </h1>
      <p className="text-gray_text3 text-center lg:text-lg font-normal mb-10">
        We offer a full range of services to help you find a property, rent or
        sell as needed.
      </p>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-l-[6px] rounded-l-sm p-2 lg:p-6 transition-colors duration-200 ${
              activeIndex === index
                ? "bg-[#FFF4F4]  border-primary_color1"
                : "bg-white border-[#f6efe9]"
            }`}
          >
            <motion.button
              className="flex justify-start gap-2 lg:gap-4 items-center w-full text-left focus:outline-none p-4"
              onClick={() => toggleFAQ(index)}
              whileHover={{ color: "" }}
              transition={{ duration: 0.2 }}
            >
              {" "}
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`text-xl ${
                  activeIndex === index
                    ? "text-primary_color1 font-semibold"
                    : "text-grey_text2 "
                }`}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25391 8.55615L10.209 14.5113L16.1641 8.55615"
                    stroke="currentColor"
                    stroke-width="1.70146"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.span>
              <h2
                className={`text-base lg:text-lg font-medium  ${
                  activeIndex === index
                    ? "text-primary_color1 font-semibold"
                    : "text-grey_text3"
                }`}
              >
                {faq.question}
              </h2>
            </motion.button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-4 pb-4 text-left"
                >
                  <p className="text-gray-600 text-sm lg:text-base ml-8 lg:ml-10">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
