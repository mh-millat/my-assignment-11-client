import React from "react";
import { motion } from "framer-motion";

const TrustedOrganizations = () => {
  const orgs = [
    {
      name: "Feeding Bangladesh",
      logo: "https://i.ibb.co/wNb38pyW/img-4446.jpg",
      url: "https://feedingbangladesh.org",
    },
    {
      name: "FoodSaver Org",
      logo: "https://i.ibb.co/YBGh0DKH/images.jpg",
      url: "https://foodsaver.org",
    },
    {
      name: "WasteLess BD",
      logo: "https://i.ibb.co/jPtr6nfZ/images-1.png",
      url: "https://wastelessbd.com",
    },
    {
      name: "Zero Waste Foundation",
      logo: "https://i.ibb.co/wNb38pyW/img-4446.jpg",
      url: "https://zerowastefoundation.org",
    },
  ];

  return (
    <section className="border-2 border-gray-100  max-w-8xl mx-auto px-4 bg-gray-50 rounded-lg py-10 sm:mt-3 md:mt-10">
      {/* Section Header */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-red-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Trusted By Leading Organizations
      </motion.h2>

      <motion.p
        className=" text-gray-600 mb-10 max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        We proudly collaborate with socially responsible organizations who are
        dedicated to reducing food waste and ensuring food security.
      </motion.p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {orgs.map((org, index) => (
          <motion.a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.img
              src={org.logo}
              alt={org.name}
              className="h-28 w-28 object-contain rounded-full border-2 border-green-600 mb-4"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {org.name}
            </h3>
            <span className="inline-block mt-auto px-3 py-1 text-white text-xs rounded-full bg-green-600">
              Verified Partner
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default TrustedOrganizations;
