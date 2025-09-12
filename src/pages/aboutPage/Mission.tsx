import React from "react";
import missionImage from "../../assets/mission1.webp";
import missionImage2 from "../../assets/mission2.webp";

const Mission: React.FC = () => {
  return (
    <div className="">
      {/* Who We Are Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Who We Are Image */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={missionImage}
                  alt="Group of business professionals gathered around reviewing documents in black and white"
                  className="w-full h-80 md:h-96 object-cover filter grayscale"
                />
              </div>
            </div>

            {/* Who We Are Text */}
            <div>
              <h2 className="text-2xl lg:text-[37px] font-bold text-primary_color mb-8">
                Who We Are
              </h2>
              <p className="text-lg md:text-[22px] text-gray_text2 leading-relaxed">
                We're a forward-thinking real estate agency focused on
                delivering luxurious, tech-enabled homes that cater to modern
                lifestyles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Mission Text */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl lg:text-[37px] font-bold text-primary_color mb-8">
                Our Mission
              </h1>
              <p className="text-lg md:text-[22px] text-gray_text2 leading-relaxed">
                To build trust and value through top-tier real estate solutions
                that are innovative, customer-centric, and future-ready.
              </p>
            </div>

            {/* Mission Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={missionImage2}
                  alt="Two professional men in suits shaking hands in an outdoor setting with palm trees in the background"
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
