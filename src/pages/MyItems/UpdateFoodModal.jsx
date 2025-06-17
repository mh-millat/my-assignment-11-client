



// today update
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateFoodModal = ({ food, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: food.title || "",
    quantity: food.quantity || "",
    category: food.category || "",
    expiryDate: food.expiryDate ? food.expiryDate.split("T")[0] : "", // ensure date input format
    description: food.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expiry date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiryDateObj = new Date(form.expiryDate);
    expiryDateObj.setHours(0, 0, 0, 0);

    if (expiryDateObj < today) {
      toast.error("Expiry date must be today or a future date.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      quantity: parseInt(form.quantity, 10),
      category: form.category,
      expiryDate: form.expiryDate,
      description: form.description.trim(),
    };

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/foods/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Food updated!");
        onUpdate();
        onClose();
      } else if (data.success === false) {
        toast.error(data.message || "Update failed!");
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error("Error in update:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Update Food</h3>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Food Name"
            required
            disabled={loading}
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Quantity"
            min={1}
            required
            disabled={loading}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
          </select>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
            disabled={loading}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Description"
            rows={3}
            required
            disabled={loading}
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFoodModal;
