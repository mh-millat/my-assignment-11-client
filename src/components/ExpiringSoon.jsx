
import { useEffect, useState } from "react";
import axios from "axios";

const ExpiringSoon = () => {
  const [expiringItems, setExpiringItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiringFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/foods/all");

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
        console.error(" Error fetching soon expiring items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringFoods();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500"><span className="loading loading-bars loading-xl"></span></div>
    );
  }

  return (
    <section className="my-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
         Expiring Soon (Next 5 Days)
      </h2>
      {expiringItems.length === 0 ? (
        <p className="text-center text-gray-500">
          No items expiring within the next 5 days.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiringItems.map((item) => {
            const expiry = new Date(item.expiryDate);

            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 border border-orange-300"
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
                <span className="inline-block mt-2 px-3 py-1 text-white text-xs rounded-full bg-orange-500">
                  Expiring Soon
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ExpiringSoon;
