import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExpiringSoon = () => {
  const [expiringItems, setExpiringItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchExpiringFoods = async () => {
      try {
        const response = await axios.get(
          "https://my-assignment-11-server-theta.vercel.app/foods/all"
        );

        const today = new Date();
        const fiveDaysLater = new Date();
        fiveDaysLater.setDate(today.getDate() + 5);

        const filtered = response.data.filter((item) => {
          if (!item.expiryDate) return false;
          const expiry = new Date(item.expiryDate);
          return expiry > today && expiry <= fiveDaysLater;
        });

        setExpiringItems(filtered);
      } catch (err) {
        console.error("Error fetching soon expiring items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringFoods();
  }, []);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 8);
  const closeModal = () => setSelectedItem(null);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <section className="my-10 sm:mt-3 md:mt-10 max-w-8xl mx-auto px-4 bg-gray-50 py-10 rounded-lg border-2 border-gray-100">
      <motion.h2
        className="text-3xl font-bold mb-6 text-red-600 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Expiring Soon (Next 5 Days)
      </motion.h2>

      {expiringItems.length === 0 ? (
        <p className="text-center text-gray-500">
          No items expiring within the next 5 days.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {expiringItems.slice(0, visibleCount).map((item, index) => {
              const expiry = new Date(item.expiryDate);
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 border border-orange-200"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-44 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-2">Category: {item.category}</p>
                  <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                  <p className="text-gray-500 mb-2">
                    Expiry Date: {expiry.toLocaleDateString()}
                  </p>
                  <span className="inline-block mb-3 px-3 py-1 text-white text-xs rounded-full bg-orange-500">
                    Expiring Soon
                  </span>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-2 w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                  >
                    View Details
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* See More Button */}
          {visibleCount < expiringItems.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleSeeMore}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                See More
              </button>
            </div>
          )}

          {/* Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-lg border border-orange-200"
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
                <h2 className="text-2xl font-semibold mb-2">{selectedItem.title}</h2>
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
                  Expiry Date: {new Date(selectedItem.expiryDate).toLocaleDateString()}
                </p>
                <span className="inline-block px-3 py-1 text-white text-xs rounded-full bg-orange-500">
                  Expiring Soon
                </span>
              </motion.div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ExpiringSoon;
