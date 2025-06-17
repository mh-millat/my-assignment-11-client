import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingNote, setAddingNote] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view this page.");
      navigate("/login");
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(`http://localhost:5000/foods/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Food not found");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setFood(data);
          setNotes(data.notes || []);
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to load food data");
        if (isMounted) setFood(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, user, navigate]);

  const getExpiryCountdown = () => {
    if (!food?.expiryDate) return "";

    const expiry = new Date(food.expiryDate);
    const now = new Date();

    expiry.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffMs = expiry - now;
    if (diffMs < 0) return "Expired";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return `${days} days, ${hours} hrs, ${minutes} mins left`;
  };

  const handleAddNote = async () => {
  if (!newNote.trim()) {
    toast.error("Note cannot be empty");
    return;
  }

  if (!user) {
    toast.error("Please login to add notes.");
    return;
  }

  const noteData = {
    text: newNote.trim(),
    postedAt: new Date().toISOString(),
    userEmail: user.email,
    userName: user.displayName || user.email,
  };

  setAddingNote(true);
  try {
    const response = await fetch(`http://localhost:5000/foods/${id}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    const data = await response.json();
    if (data.success) {
      setNotes((prev) => [...prev, noteData]);
      setNewNote("");
      toast.success("Note added!");
    } else {
      toast.error(data.message || "Failed to add note");
    }
  } catch (error) {
    toast.error("Error adding note");
  } finally {
    setAddingNote(false);
  }
};


  const handleRequest = () => {
    toast("Request feature coming soon!");
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-500">Food Not Found</h2>
      </div>
    );
  }

  const isOwner =
    user?.email === food.userEmail || user?.email === food.donatorEmail;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-white rounded shadow p-6 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-2"
        >
          ← Back
        </button>

        <img
          src={food.image || "https://via.placeholder.com/400x300"}
          alt={food.title}
          className="w-full rounded-lg h-64 object-cover"
        />
        <h2 className="text-2xl font-bold">{food.title}</h2>
        <p>
          <strong>Category:</strong> {food.category}
        </p>
        <p>
          <strong>Quantity:</strong> {food.quantity}
        </p>
        <p>
          <strong>Expiry Date:</strong>{" "}
          {new Date(food.expiryDate).toLocaleDateString()}
        </p>
        <p className="font-semibold text-red-600">{getExpiryCountdown()}</p>
        <hr />
        <p>
          <strong>Donator:</strong> {food.donatorName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {food.donatorEmail || "N/A"}
        </p>

        {!isOwner && (
          <button
            onClick={handleRequest}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Request Food
          </button>
        )}
      </div>

      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Notes</h3>

        {notes.length === 0 && (
          <p className="text-gray-500">No notes yet.</p>
        )}

        <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto">
          {notes.map((note, idx) => (
            <li key={idx} className="border p-3 rounded bg-gray-50">
              <p>{note.text}</p>
              <small className="text-gray-400">
                By {note.userName || note.userEmail} on{" "}
                {new Date(note.postedAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>

        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={
            isOwner
              ? "Add a new note..."
              : "You can only add notes to your own items."
          }
          disabled={!isOwner || addingNote}
          noValidate
        />

        <button
          onClick={handleAddNote}
          disabled={!isOwner || addingNote}
          className={`px-4 py-2 rounded text-white ${isOwner
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {addingNote ? "Adding..." : "Add Note"}
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;
