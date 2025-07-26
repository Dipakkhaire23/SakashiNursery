import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react"; // Lucide icon for delete

const AdminReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/reviews/all", {
        withCredentials: true,
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review by email & productName
 
  const handleDelete = async (email, productName) => {
    if (!window.confirm(`Are you sure you want to delete the review for ${productName}?`)) return;

    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/reviews/delete", {
        data: { email, productName },
        withCredentials: true,
      });
      alert("Review deleted successfully");
      fetchReviews(); // Refresh list
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">Customer</th>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Rating</th>
              <th className="py-3 px-4 border-b">Comment</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{review.customerusername}</td>
                  <td className="py-3 px-4 border-b">{review.productname}</td>
                  <td className="py-3 px-4 border-b text-yellow-500">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </td>
                  <td className="py-3 px-4 border-b">{review.comment}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(review.email, review.productname)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewList;
