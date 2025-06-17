


// import { useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import UpdateFoodModal from "./UpdateFoodModal";

// const MyItems = () => {
//   const { user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null); // for update modal

//   useEffect(() => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/my-items?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(() => toast.error("Failed to fetch items"));
//   }, [user?.email]);

//   const handleDelete = async id => {
//     const confirmDelete = window.confirm("Are you sure to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/foods/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();

//       if (result.deletedCount > 0) {
//         toast.success("Item deleted!");
//         setItems(prev => prev.filter(item => item._id !== id));
//       } else {
//         toast.error("Failed to delete item");
//       }
//     } catch {
//       toast.error("Error deleting item");
//     }
//   };

//   const reloadItems = () => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/my-items?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(() => toast.error("Failed to reload items"));
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Expiry</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No items found.
//                 </td>
//               </tr>
//             )}
//             {items.map(item => (
//               <tr key={item._id} className="border-b">
//                 <td className="py-2 px-4">
//                   <img src={item.image} alt={item.title} className="w-12 h-12 rounded" />
//                 </td>
//                 <td className="py-2 px-4">{item.title}</td>
//                 <td className="py-2 px-4">{item.category}</td>
//                 <td className="py-2 px-4">{item.quantity}</td>
//                 <td className="py-2 px-4">{item.expiryDate}</td>
//                 <td className="py-2 px-4 space-x-2">
//                   <button
//                     onClick={() => setSelectedFood(item)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedFood && (
//         <UpdateFoodModal
//           food={selectedFood}
//           onClose={() => setSelectedFood(null)}
//           onUpdate={reloadItems}
//         />
//       )}
//     </div>
//   );
// };

// export default MyItems;



// connect to mongodb code
// import { useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import UpdateFoodModal from "./UpdateFoodModal";

// const MyItems = () => {
//   const { user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null); // for update modal

//   const fetchItems = () => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/my-items?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(() => toast.error("Failed to fetch items"));
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [user?.email]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/foods/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();

//       if (result.deletedCount > 0) {
//         toast.success("Item deleted!");
//         setItems(prev => prev.filter(item => item._id !== id));
//       } else {
//         toast.error("Failed to delete item");
//       }
//     } catch {
//       toast.error("Error deleting item");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Expiry</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No items found.
//                 </td>
//               </tr>
//             ) : (
//               items.map(item => (
//                 <tr key={item._id} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 rounded object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4">{item.name}</td>
//                   <td className="py-2 px-4">{item.category}</td>
//                   <td className="py-2 px-4">{item.quantity}</td>
//                   <td className="py-2 px-4">{item.expiryDate}</td>
//                   <td className="py-2 px-4 space-x-2">
//                     <button
//                       onClick={() => setSelectedFood(item)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Modal */}
//       {selectedFood && (
//         <UpdateFoodModal
//           food={selectedFood}
//           onClose={() => setSelectedFood(null)}
//           onUpdate={fetchItems}
//         />
//       )}
//     </div>
//   );
// };

// export default MyItems;

// mongodb 2nd code
// import { useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import UpdateFoodModal from "./UpdateFoodModal";

// const MyItems = () => {
//   const { user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null); // for update modal

//   const fetchItems = () => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/foods?email=${user.email}`) // ✅ fixed route
//       .then(res => {
//         if (!res.ok) throw new Error("Fetch failed");
//         return res.json();
//       })
//       .then(data => setItems(data))
//       .catch(() => toast.error("Failed to fetch items"));
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [user?.email]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/foods/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();

//       if (result.deletedCount > 0) {
//         toast.success("Item deleted!");
//         setItems(prev => prev.filter(item => item._id !== id));
//       } else {
//         toast.error("Failed to delete item");
//       }
//     } catch {
//       toast.error("Error deleting item");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Expiry</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No items found.
//                 </td>
//               </tr>
//             ) : (
//               items.map(item => (
//                 <tr key={item._id} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 rounded object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4">{item.name}</td>
//                   <td className="py-2 px-4">{item.category}</td>
//                   <td className="py-2 px-4">{item.quantity}</td>
//                   <td className="py-2 px-4">{item.expiryDate}</td>
//                   <td className="py-2 px-4 space-x-2">
//                     <button
//                       onClick={() => setSelectedFood(item)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Modal */}
//       {selectedFood && (
//         <UpdateFoodModal
//           food={selectedFood}
//           onClose={() => setSelectedFood(null)}
//           onUpdate={fetchItems}
//         />
//       )}
//     </div>
//   );
// };

// export default MyItems;



// 3rd
// import { useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import UpdateFoodModal from "./UpdateFoodModal";

// const MyItems = () => {
//   const { user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null);

//   const fetchItems = () => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/foods?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(() => toast.error("Failed to fetch items"));
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [user?.email]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/foods/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();

//       if (result.success) {
//         toast.success("Item deleted!");
//         setItems(prev => prev.filter(item => item._id !== id));
//       } else {
//         toast.error(result.message || "Failed to delete item");
//       }
//     } catch {
//       toast.error("Error deleting item");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Expiry</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No items found.
//                 </td>
//               </tr>
//             ) : (
//               items.map(item => (
//                 <tr key={item._id} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-4">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-12 h-12 rounded object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4">{item.title}</td>
//                   <td className="py-2 px-4">{item.category}</td>
//                   <td className="py-2 px-4">{item.quantity}</td>
//                   <td className="py-2 px-4">{item.expiryDate}</td>
//                   <td className="py-2 px-4 space-x-2">
//                     <button
//                       onClick={() => setSelectedFood(item)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Modal */}
//       {selectedFood && (
//         <UpdateFoodModal
//           food={selectedFood}
//           onClose={() => setSelectedFood(null)}
//           onUpdate={fetchItems}
//         />
//       )}
//     </div>
//   );
// };

// export default MyItems;

// today last update
// import { useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import UpdateFoodModal from "./UpdateFoodModal";

// const MyItems = () => {
//   const { user } = useContext(AuthContext);
//   const [items, setItems] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchItems = async () => {
//     if (!user?.email) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/foods?email=${user.email}`);
//       if (!res.ok) throw new Error("Failed to fetch items");
//       const data = await res.json();
//       setItems(data);
//     } catch (error) {
//       toast.error(error.message || "Failed to fetch items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [user?.email]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this item?");
//     if (!confirmDelete) return;

//     setDeletingId(id);
//     try {
//       const res = await fetch(`http://localhost:5000/foods/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();

//       if (result.success) {
//         toast.success("Item deleted!");
//         setItems((prev) => prev.filter((item) => item._id !== id));
//       } else {
//         toast.error(result.message || "Failed to delete item");
//       }
//     } catch {
//       toast.error("Error deleting item");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     if (isNaN(date)) return "Invalid date";
//     return date.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-500">
//         Loading your items...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Image</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Expiry</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No items found.
//                 </td>
//               </tr>
//             ) : (
//               items.map((item) => (
//                 <tr key={item._id} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-4">
//                     <img
//                       src={item.image || "https://via.placeholder.com/48"}
//                       alt={item.title || "Food item"}
//                       className="w-12 h-12 rounded object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4">{item.title}</td>
//                   <td className="py-2 px-4">{item.category}</td>
//                   <td className="py-2 px-4">{item.quantity}</td>
//                   <td className="py-2 px-4">{formatDate(item.expiryDate)}</td>
//                   <td className="py-2 px-4 space-x-2">
//                     <button
//                       onClick={() => setSelectedFood(item)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                       aria-label={`Update ${item.title}`}
//                       disabled={deletingId === item._id}
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                       aria-label={`Delete ${item.title}`}
//                       disabled={deletingId === item._id}
//                     >
//                       {deletingId === item._id ? "Deleting..." : "Delete"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Modal */}
//       {selectedFood && (
//         <UpdateFoodModal
//           food={selectedFood}
//           onClose={() => setSelectedFood(null)}
//           onUpdate={fetchItems}
//         />
//       )}
//     </div>
//   );
// };

// export default MyItems;


// today last update
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import UpdateFoodModal from "./UpdateFoodModal";

const itemsPerPage = 5;

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  // Filter & search states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = () => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(() => toast.error("Failed to fetch items"));
  };

  useEffect(() => {
    fetchItems();
  }, [user?.email]);

  // Apply search and filter
  useEffect(() => {
    let temp = [...items];

    if (searchTerm) {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      temp = temp.filter((item) => item.category === categoryFilter);
    }

    setFilteredItems(temp);
    setCurrentPage(1); // reset to page 1 on search/filter change
  }, [searchTerm, categoryFilter, items]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/foods/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Item deleted!");
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(result.message || "Failed to delete item");
      }
    } catch {
      toast.error("Error deleting item");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Food Items</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="border px-3 py-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded w-full md:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Expiry</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">{item.expiryDate}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => setSelectedFood(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedFood && (
        <UpdateFoodModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onUpdate={fetchItems}
        />
      )}
    </div>
  );
};

export default MyItems;
