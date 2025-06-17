import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import UpdateRequestModal from "./UpdateRequestModal";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`https://my-assignment-11-server-theta.vercel.app/my-requests?email=${user.email}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(() => toast.error("Failed to load requests"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this request?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://my-assignment-11-server-theta.vercel.app/requests/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        toast.success("Request deleted!");
        setRequests(prev => prev.filter(req => req._id !== id));
      }
    } catch {
      toast.error("Failed to delete request");
    }
  };

  const openEditModal = (request) => {
    setEditingRequest(request);
  };

  const closeEditModal = () => {
    setEditingRequest(null);
  };

  const handleUpdate = (updatedData) => {
    setRequests(prev =>
      prev.map(req => (req._id === editingRequest._id ? { ...req, ...updatedData } : req))
    );
    setEditingRequest(null);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center text-gray-600">
        <p>Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center text-gray-600">
        <h2 className="text-xl font-semibold">No requests found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} className="border-b">
                <td className="py-2 px-4">{req.title}</td>
                <td className="py-2 px-4">{req.quantity}</td>
                <td className="py-2 px-4">{req.status || "Pending"}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(req)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRequest && (
        <UpdateRequestModal
          request={editingRequest}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyRequests;
