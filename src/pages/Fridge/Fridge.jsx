

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Fridge = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch("http://localhost:5000/fridge")
        .then(res => res.json())
        .then(data => setFoods(data))
        .catch(() => setFoods([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const today = new Date();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">All Food Items</h2>

      {loading ? (
        // <p className="text-center text-gray-500">Loading...</p>
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-bars loading-2xl"></span>
        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foods.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No food items found in the fridge.
            </p>
          )}

          {foods.map(food => {
            const expiryDate = new Date(food.expiryDate);
            const isExpired = expiryDate < today;

            return (
              <div
                key={food._id}
                className="border p-4 rounded shadow bg-white dark:bg-gray-800 flex flex-col"
              >
                <img
                  src={food.image || "https://via.placeholder.com/150"}
                  alt={food.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{food.title}</h3>
                <p><strong>Category:</strong> {food.category}</p>
                <p><strong>Quantity:</strong> {food.quantity}</p>
                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {expiryDate.toLocaleDateString()}
                </p>

                {isExpired && (
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-2 w-max">
                    Expired
                  </span>
                )}

                <button
                  onClick={() => navigate(`/food/${food._id}`)}
                  className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
                >
                  See Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Fridge;
