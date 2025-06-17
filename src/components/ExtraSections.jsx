
import { motion } from "framer-motion";

const ExtraSections = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <motion.div
        className="bg-green-50 p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-3 md:mb-4">
          Why Track Food Expiry?
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Tracking expiry dates helps you stay organized, avoid health risks, and save money by reducing food waste. 
          It ensures that you consume food while it is still safe and nutritious.
        </p>
      </motion.div>
      <motion.div
        className="bg-yellow-50 p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700 mb-3 md:mb-4">
          Tips to Reduce Food Waste
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 text-gray-800 text-base sm:text-lg leading-relaxed space-y-2">
          <li>Check your fridge weekly and remove expired items.</li>
          <li>Use labels to track when you opened items.</li>
          <li>Store food properly to extend shelf life.</li>
          <li>Plan meals before shopping to avoid overbuying.</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default ExtraSections;
