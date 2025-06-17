
import React from "react";

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
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Trusted By Leading Organizations
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We proudly collaborate with socially responsible organizations who are dedicated to reducing food waste and ensuring food security.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {orgs.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition w-60 text-center"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="h-24 mx-auto object-contain mb-4"
              />
              <p className="text-gray-700 font-medium">{org.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedOrganizations;
