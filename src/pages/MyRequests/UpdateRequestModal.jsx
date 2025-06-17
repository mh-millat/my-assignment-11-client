import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateRequestModal = ({ request, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: request.title,
    quantity: request.quantity,
    status: request.status || "Pending",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/requests/${request._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success("Request updated!");
        onUpdate(form);
        onClose();
      } else {
        toast.error("Update failed!");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOuterClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={handleOuterClick}
    >
      <div className="bg-white rounded p-6 w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Update Request</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded p-2"
            min={1}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRequestModal;
