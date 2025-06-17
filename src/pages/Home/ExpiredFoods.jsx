
import { useEffect, useState } from "react";
import axios from "axios";

const ExpiredFoods = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiredFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/foods/expired-public");
        setExpiredItems(response.data);
      } catch (err) {
        console.error("❌ Error fetching expired items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredFoods();
  }, []);

  return (
    <section className="my-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center"> Expired Food Items</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading expired items...</p>
      ) : expiredItems.length === 0 ? (
        <p className="text-center text-gray-500">No expired items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredItems.map((item) => {
            const expiry = new Date(item.expiryDate);
            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 border border-red-300"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-500">
                  Expiry Date: {expiry.toLocaleDateString()}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-white text-xs rounded-full bg-red-600">
                  Expired
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ExpiredFoods;
