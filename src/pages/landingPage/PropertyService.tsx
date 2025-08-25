import React from "react";
import { motion,type Variants } from "framer-motion";
import { ExternalLink, Home, FileText, Briefcase } from "lucide-react";
import property1 from "../../assets/Frame 2147223900.webp"
import property2 from "../../assets/Frame 2147223900-1.webp"
import property3 from "../../assets/Frame 2147223900-2.webp"

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
}

const PropertyServices: React.FC = () => {
  const services: ServiceCard[] = [
    {
      id: 1,
      title: "Buy a Property",
      description:
        "Find your property with a vast selection of options tailored to ideally match your unique preferences.",
      icon: <Home className="w-8 h-8" />,
      image: property1,
      link: "#",
    },
    {
      id: 2,
      title: "Rent a Property",
      description:
        "Discover the perfect housing solution, whether you need a convenient and temporary stay.",
      icon: <FileText className="w-8 h-8" />,
      image: property2,
      link: "#",
    },
    {
      id: 3,
      title: "Sell a Property",
      description:
        "Sell your property with maximum visibility, easily connect with a broad audience of buyers.",
      icon: <Briefcase className="w-8 h-8" />,
      image: property3,
      link: "#",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants:Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleReadGuide = (serviceTitle: string) => {
    console.log(`Reading guide for: ${serviceTitle}`);
    // Add your navigation logic here
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-0 ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-white px-4 py-2 rounded-full text-[15px] border border-gray-200 mb-3"
          >
            <span className="text-gray_text2 font-medium">
              Services We Provide
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-[45px] font-bold text-gray_text3"
          >
            Complete Property Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-gray_text3 max-w-3xl mx-auto"
          >
            We offer a full range of services to help you find a property, rent
            or sell as needed.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group p-3 bg-white rounded-xl shadow transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-[392px] h-[300px] object-cover transition-transform duration-500 rounded-xl group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  className="flex items-center mb-0.5 text-center justify-center"
                >
                  <h3 className="text-xl md:text-[22px] font-bold text-gray_text3 transition-colors duration-300">
                    {service.title}
                  </h3>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  className="text-gray_text2 leading-[150%] mb-4 text-[15px] "
                >
                  {service.description}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                  onClick={() => handleReadGuide(service.title)}
                  whileHover={{
                    scale: 1.05,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center text-accent  font-semibold text-lg transition-all duration-300 group-hover:gap-3 gap-2"
                >
                  Read Guide
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-primary_color text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore All Services
            </button>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default PropertyServices;
