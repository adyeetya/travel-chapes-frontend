import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const stats = [
  { label: 'Total Trips', value: 750, suffix: '+', icon: '✈️' },
  { label: 'Happy Travelers', value: 4250, suffix: '+', icon: '😊' },
  { label: 'Social Reach', value: 122000, suffix: '+', icon: '📱' },
  { label: 'Experience', value: 3, suffix: '+ Years', icon: '⏳' },
];

const AnimatedStat = ({ label, value, suffix, icon }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <div 
      ref={ref} 
      className="text-center "
    >
     
      <div className="md:text-3xl font-bold text-yellow-400 block">
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs whitespace-nowrap md:text-base text-blue-100 mt-1 block">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <div className=" md:px-4 max-w-screen-xl mx-auto">
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-4">
        {stats.map((stat) => (
          <AnimatedStat
            key={stat.label}
            label={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};