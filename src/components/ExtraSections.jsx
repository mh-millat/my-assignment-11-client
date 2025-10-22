import { motion } from "framer-motion";

const ExtraSections = () => {
  return (
    <section className="max-w-8xl sm:mt-3 md:mt-10 border-2 border-gray-100 mx-auto px-4 sm:px-4 lg:px-4 py-10 rounded-lg space-y-5 bg-gray-50">
      
      {/* Section Main Title */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-8"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Extra Information & Tips
      </motion.h1>

      {/* Section 1 */}
      <motion.div
        className="p-5 sm:p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3 md:mb-4">
          Why Track Food Expiry?
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Tracking expiry dates helps you stay organized, avoid health risks, and save money by reducing food waste. 
          It ensures that you consume food while it is still safe and nutritious.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        className=" p-5 sm:p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3 md:mb-4">
          Tips to Reduce Food Waste
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 text-gray-800 text-base sm:text-lg leading-relaxed space-y-2">
          <li>Check your fridge weekly and remove expired items.</li>
          <li>Use labels to track when you opened items.</li>
          <li>Store food properly to extend shelf life.</li>
          <li>Plan meals before shopping to avoid overbuying.</li>
        </ul>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        className=" p-5 sm:p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3 md:mb-4">
          Stay Aware, Stay Healthy
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Maintaining awareness of what’s in your pantry prevents both food spoilage and unnecessary spending. 
          Together, we can make conscious choices to build a waste-free future.
        </p>
      </motion.div>
    </section>
  );
};

export default ExtraSections;
