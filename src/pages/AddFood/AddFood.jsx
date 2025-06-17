


// today update 100% working
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    const expiryDateValue = form.expiryDate.value;

    // Timezone-safe expiry date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0); // midnight today

    const expiryDate = new Date(expiryDateValue);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate < today) {
      toast.error("Expiry date must be today or a future date.");
      return;
    }

    const food = {
      image: form.image.value.trim(),
      title: form.title.value.trim(),
      category: form.category.value,
      quantity: parseInt(form.quantity.value, 10),
      expiryDate: expiryDateValue,
      description: form.description.value.trim(),
      addedDate: new Date().toISOString(),
      storage: "Fridge", // Hardcoded
      userEmail: user?.email || "",
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Food added successfully!");
        form.reset();
        navigate("/my-items");
      } else {
        toast.error("Failed to add food.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Food</h2>
      <form onSubmit={handleAddFood} className="space-y-4" noValidate>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Food Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="category"
          className="w-full border px-3 py-2 rounded"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Vegetables</option>
          <option>Snacks</option>
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="w-full border px-3 py-2 rounded"
          required
          min={1}
        />
        <input
          type="date"
          name="expiryDate"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
