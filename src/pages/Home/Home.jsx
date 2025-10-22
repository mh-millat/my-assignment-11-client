import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ExtraSections from "../../components/ExtraSections";
import TrustedOrgs from "../../components/TrustedOrgs";
import TopFoods from "../TopFoods/TopFoods";
import ExpiringSoon from "../../components/ExpiringSoon";
import ExpiredFoods from "./ExpiredFoods";
import FAQSection from "../../components/Faq/Faq";
import AboutUs from "../../components/About/About";

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
    <main className="bg-gray-50">
      <section className="relative flex justify-center py-8">
        <div className="w-full max-w-8xl rounded-lg overflow-hidden shadow-lg">
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
                className="relative h-[500px] md:h-[600px] w-full rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center md:px-8 py-20 px-6 rounded-2xl shadow-2xl bg-white bg-opacity-80 backdrop-blur-sm">
                    <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
                      {slide.title}
                    </h2>
                    <p className="text-lg text-gray-500 mt-4 mb-6">{slide.description}</p>
                    <Link
                      to={slide.buttonLink}
                      className="inline-block px-6 py-3 rounded-lg font-semibold transition bg-green-600 hover:bg-green-700 text-white"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <AboutUs />
      <ExpiredFoods />
      <ExpiringSoon />
      <TopFoods />
      <TrustedOrgs />
      <ExtraSections />
      <FAQSection />
    </main>
  );
};

export default Home;
