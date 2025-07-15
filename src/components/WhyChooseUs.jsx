import Image from "next/image";
import { FaGlobeAsia } from "react-icons/fa";
const WhyChooseUs = () => {
  const features = [
    {
      title: "Ultimate flexibility",
      description: "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
      icon: "/images/homepage/About_1_ticket.svg", // Replace with your actual image path
    },
    {
      title: "Memorable experiences",
      description: "Browse and book tours and activities so incredible, you'll want to tell your friends.",
      icon: "/images/homepage/About_2_hot-air-balloon.svg", // Replace with your actual image path
    },
    {
      title: "Quality at our core",
      description: "High-quality standards. Millions of reviews. A tourz company.",
      icon: "/images/homepage/About_3_diamond.svg", // Replace with your actual image path
    },
    {
      title: "Award-winning support",
      description: "New price? New plan? No problem. We're here to help, 24/7.",
      icon: "/images/homepage/About_4_medal.svg", // Replace with your actual image path
    },
  ];

  return (
    <section className="pb-6 my-8 md:my-12 px-4 sm:px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-4xl font-semibold md:font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <FaGlobeAsia className="md:h-10 md:w-10 h-6 w-6 sm:h-6 sm:w-6 text-yellow-600" />
          Why Choose TravelChapes
        </h2>
        <div className="mt-8 grid grid-cols-2 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center px-2 py-3 sm:px-4 sm:py-4">
              <div className="flex justify-center mb-2 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;