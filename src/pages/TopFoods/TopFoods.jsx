import { useEffect, useState } from "react";

const TopFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-assignment-11-server-theta.vercel.app/top-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching top foods:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Top Food Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No top foods found.</p>
        ) : (
          foods.slice(0, 6).map((food) => (
            <div key={food._id} className="border p-4 rounded-lg shadow bg-white">
              <img
                src={food.image || "https://via.placeholder.com/150"}
                alt={food.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-green-800">{food.title}</h3>
              <p className="text-sm text-gray-600"><strong>Category:</strong> {food.category}</p>
              <p className="text-sm text-gray-600"><strong>Quantity:</strong> {food.quantity}</p>
              <p className="text-sm text-gray-600"><strong>Expiry:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopFoods;
