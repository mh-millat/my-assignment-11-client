import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExpiredFoods = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchExpiredFoods = async () => {
      try {
        const response = await axios.get(
          "https://my-assignment-11-server-theta.vercel.app/foods/expired-public"
        );
        setExpiredItems(response.data);
      } catch (err) {
        console.error("Error fetching expired items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredFoods();
  }, []);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 8);
  const closeModal = () => setSelectedItem(null);

  return (
    <section className="my-10 sm:mt-3 md:mt-10 max-w-8xl mx-auto px-4 border-2 border-gray-100 bg-gray-50 py-10 rounded-lg">
      <motion.h2
        className="text-3xl font-bold mb-6 text-red-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Expired Food Items
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading expired items...</p>
      ) : expiredItems.length === 0 ? (
        <p className="text-center text-gray-500">No expired items found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {expiredItems.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 border border-gray-100
                "
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-green-600 font-bold mb-2">Price: ${item.price || 0}</p>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="mt-2 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>

          {/* See More Button */}
          {visibleCount < expiredItems.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleSeeMore}
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-800 transition"
              >
                See More
              </button>
            </div>
          )}

          {/* Details Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                className="bg-white rounded-xl max-w-lg w-full p-6 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-56 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-gray-700 mb-1">
                  Category: {selectedItem.category}
                </p>
                <p className="text-gray-700 mb-1">
                  Quantity: {selectedItem.quantity}
                </p>
                <p className="text-gray-700 mb-1">
                  Price: ${selectedItem.price || 0}
                </p>
                <p className="text-gray-500 mb-2">
                  Expiry Date:{" "}
                  {new Date(selectedItem.expiryDate).toLocaleDateString()}
                </p>
                <span className="inline-block px-3 py-1 text-white text-xs rounded-full bg-red-600">
                  Expired
                </span>
              </motion.div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ExpiredFoods;
