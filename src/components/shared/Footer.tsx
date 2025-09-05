import React from "react";
import { motion,type Variants } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Logo from "../iconComponent/Logo";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkHoverVariants: Variants = {
    hover: {
      scale: 1.05,
      color: "#f59e0b",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: { scale: 0.95 },
  };

  const socialIconVariants: Variants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      backgroundColor: "#f59e0b",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: { scale: 0.9 },
  };

  const logoVariants: Variants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const footerLinks = [
    {
      title: "New Listing",
      links: [
        { name: "Buy a Property", href: "#" },
        { name: "Rent a Property", href: "#" },
        { name: "Sell a Property", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "About Us", href: "#" },
        { name: "Tenancy Profiling", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Digital Consent", href: "#" },
        { name: "KYC", href: "#" },
        { name: "Landlord", href: "#" },
        { name: "Tenancy Agreement", href: "#" },
        { name: "Tenancy Profiling", href: "#" },
      ],
    },
  ];

  const socialIcons = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <motion.footer
      className={`bg-primary_color text-white ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-2 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info Section */}
          <motion.div
            className="lg:col-span-1 space-y-6 w-full lg:w-[500px]"
            variants={itemVariants}
          >
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              <Logo />
            </motion.div>

            <motion.p
              className="text-white text-sm leading-relaxed  w-full"
              variants={itemVariants}
            >
              At AtticaHQ, we don't just deal in properties, we create places
              where life happens.
            </motion.p>

            <motion.div className="space-y-3" variants={itemVariants}>
              <motion.div
                className="flex items-center space-x-3 text-white"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Mail size={18} className="text-white" />
                <span>contact@atticahq.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-white"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Phone size={18} className="text-white" />
                <span>+2348137209801</span>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div className="flex space-x-4 pt-4" variants={itemVariants}>
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-primary_color rounded-full flex items-center justify-center text-white"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index: number) => (
            <motion.div
              key={section.title}
              className={`space-y-6 ${
                index <1 &&index !=2 ? "lg:ml-[200px] w-full" : "lg:ml-8 w-full"
              }`}
              variants={itemVariants}
            >
              <motion.h3
                className="text-xl font-semibold text-white border-b border-primary_color pb-2"
                whileHover={{ color: "#fbbf24", transition: { duration: 0.2 } }}
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-white hover:text-white transition-colors duration-200 block"
                      variants={linkHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-primary_color mt-12 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-white text-sm"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              © 2025 AtticaHQ All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-6 text-sm"
              variants={itemVariants}
            >
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                variants={linkHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                variants={linkHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Terms & Conditions
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
