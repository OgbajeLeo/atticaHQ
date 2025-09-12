import { MoveUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-8 px-2  lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-gray_text3 text-center p-2 md:p-8 my-3 lg:mb-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray_text2">Last Updated July 20th, 2025</p>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <main className="w-full lg:w-3/4 p-6 md:p-8">
            <section id="section1" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                1. What Personal Information are we collect
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>

            <section id="section2" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                2. What we do with the Personal Information we Collect
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>

            <section id="section3" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                3. When we Disclose Personal Information
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>

            <section id="section4" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                4. How we use cookies and collect information using Technology
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>

            <section id="section5" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                5. Security
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>

            <section id="section6" className="mb-8 scroll-mt-20">
              <h2 className="text-xl lg:text-[26px] font-semibold text-accent mb-4">
                6. We May Transfer Personal Information to Other Countries
              </h2>
              <p className="text-gray_text2 text-base lg:text-lg leading-relaxed">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                Ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the line).
              </p>
            </section>
          </main>

          {/* Table of Contents - Hidden on mobile, sticky on desktop */}
          <aside className="hidden lg:block w-full lg:w-1/4 p-6 bg-white shadow-md sticky top-4 self-start h-fit max-h-[calc(100vh-2rem)] border rounded-md border-gray-100 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-accent">
              Table of Contents
            </h2>
            <nav>
              <ul className="space-y-2">
                {[
                  {
                    id: "section1",
                    title: "What Personal Information are we collect",
                  },
                  {
                    id: "section2",
                    title:
                      "What we do with the Personal Information we Collect",
                  },
                  {
                    id: "section3",
                    title: "When we Disclose Personal Information",
                  },
                  {
                    id: "section4",
                    title:
                      "How we use cookies and collect information using Technology",
                  },
                  { id: "section5", title: "Security" },
                  {
                    id: "section6",
                    title:
                      "We May Transfer Personal Information to Other Countries",
                  },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left underline text-xs md:text-sm w-full px-2 py-1 rounded transition-colors ${
                        activeSection === item.id
                          ? " text-accent font-medium"
                          : "text-gray_text2 text-xs lg:text-sm  hover:bg-gray-100"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-8 border-t border-gray-200 mt-8 text-center">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center px-4 py-2 text-accent  rounded-md  transition-colors"
              >
                Back to Top
                <span>
                  <MoveUp /> 
                </span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Terms;
