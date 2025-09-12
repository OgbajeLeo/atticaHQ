import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = end * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  return (
    <div ref={counterRef} className="inline-block">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
};

const StatsCounter: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: "8.93",
      label: "Profit Return Rate",
      suffix: "%",
    },
    {
      value: "17.8",
      label: "Listed Properties",
      suffix: "K",
    },
    {
      value: "3",
      label: "Years of Experience",
      suffix: "+",
    },
  ];

  const parseStatValue = (value: string): number => {
    return parseFloat(value.replace(/[^\d.]/g, ""));
  };

  const getDecimals = (value: string): number => {
    const decimalPart = value.split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  };

  return (
    <div className="w-full bg-[#FFF4F4] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="space-y-4">
                {/* Counter Value */}
                <div className="relative">
                  <h3 className="text-4xl sm:text-[45px] lg:text-[45px] font-bold text-gray_text3 tracking-tight">
                    <Counter
                      end={parseStatValue(stat.value)}
                      duration={2500 + index * 200}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={getDecimals(stat.value)}
                    />
                  </h3>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#A60F01] rounded-full origin-center"
                    style={{ width: "60px" }}
                  />
                </div>

                {/* Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                  }}
                  className="text-lg sm:text-xl text-gray_text2 font-medium "
                >
                  {stat.label}
                </motion.p>
              </div>

              {/* Hover effect */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 1 + index * 0.1,
                }}
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl -z-10 group-hover:opacity-20 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsCounter;
