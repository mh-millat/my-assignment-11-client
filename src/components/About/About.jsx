import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="max-w-8xl mx-auto px-4 py-16 bg-gray-50 rounded-lg border-2 border-gray-100 sm:mt-3 md:mt-10">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-red-600 mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Food Tracker
      </motion.h2>

      <motion.div
        className="space-y-6 max-w-8xl mx-auto text-gray-700 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Always visible */}
        <p>
          <strong>Food Tracker</strong> is an innovative platform designed to help individuals and families manage their food efficiently, reduce waste, and stay organized. Our mission is to create a sustainable environment by ensuring that food is consumed before it expires, thus minimizing unnecessary waste.
        </p>

        {/* Hidden on small devices, visible from md upwards */}
        <p className="hidden sm:hidden md:block lg:block">
          We believe that small actions lead to big changes. By managing your food properly, you save money, protect the environment, and contribute to a more sustainable future. Our platform is user-friendly, responsive, and designed with practical features to simplify your daily food management routine.
        </p>

        <p className="hidden sm:hidden md:block lg:block">
          Food Tracker also collaborates with trusted organizations to promote food donation and social responsibility. Whether it's reducing food waste in your home or helping communities in need, our platform bridges the gap between awareness and action.
        </p>

        <p className="hidden sm:hidden md:block lg:block">
          <strong>Join Food Tracker today</strong> and take the first step towards a more organized, efficient, and waste-free lifestyle. Together, we can make a significant impact on the world, one meal at a time.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutUs;
