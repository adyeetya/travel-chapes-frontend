import Image from "next/image";

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Why choose TravelChapes</h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;