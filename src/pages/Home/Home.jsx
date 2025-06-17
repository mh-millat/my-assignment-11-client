
// export default Home;
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import NearlyExpired from "./ExpiredFoods";
// import ExpiredItems from "../../components/ExpiringSoon";
import ExtraSections from "../../components/ExtraSections";
import TrustedOrgs from "../../components/TrustedOrgs";
import TopFoods from "../TopFoods/TopFoods";
import ExpiringSoon from "../../components/ExpiringSoon";
import ExpiredFoods from "./ExpiredFoods";

const slides = [
  {
    title: "Reduce Waste, Share Hope",
    description: "Track expiry, save food, and help others in need.",
    buttonText: "Donate Now",
    buttonLink: "/add-food",
    imageUrl: "https://i.ibb.co/NghHG3PW/111111.jpg",
    color: "green",
  },
  {
    title: "Track. Save. Serve.",
    description: "Get alerts before your food expires and keep your fridge in check.",
    buttonText: "My Items",
    buttonLink: "/my-items",
    imageUrl: "https://i.ibb.co/MWbBWqq/222222.jpg",
    color: "yellow",
  },
  {
    title: "Join The Food Rescue Movement",
    description: "Partner with organizations and make a real difference today.",
    buttonText: "View Fridge",
    buttonLink: "/fridge",
    imageUrl: "https://i.ibb.co/SX1V9pPT/333333.webp",
    color: "red",
  },
];

const Home = () => {
  return (
    <main>
      {/* ✅ Banner Section with Text on Top of Image */}
      <section className="relative">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
          transitionTime={700}
          showStatus={false}
          showArrows={false}
          swipeable
          emulateTouch
        >
          {slides.map((slide, index) => (
  <div
    key={index}
    className="relative h-[500px] md:h-[600px] w-full"
    style={{
      backgroundImage: `url(${slide.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay Content */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-gray-900 md:px-8 py-20 px-6 rounded-2xl shadow-2xl bg-white bg-opacity-80 backdrop-blur-sm">
        <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
          {slide.title}
        </h2>
        <p className="text-lg mt-4 mb-6">{slide.description}</p>
        <Link
          to={slide.buttonLink}
          className={`inline-block px-6 py-3 rounded-lg font-semibold transition
            ${
              slide.color === "green"
                ? "bg-green-700 hover:bg-green-800 text-white"
                : slide.color === "yellow"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
        >
          {slide.buttonText}
        </Link>
      </div>
    </div>
  </div>
))}

        </Carousel>
      </section>

      {/* ✅ Other Sections */}
      {/* <NearlyExpired /> */}
      <ExpiredFoods></ExpiredFoods>
      {/* <ExpiredItems /> */}
      <ExpiringSoon></ExpiringSoon>
      <TopFoods></TopFoods>
      <TrustedOrgs />
      <ExtraSections />
      
    </main>
  );
};

export default Home;
