import  { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Mail,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Eye,
  Loader
} from "lucide-react";
// const token=localStorage.getItem("token");
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/admin/users/allUsers", {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
                   withCredentials: true // ✅ Send cookies with the request

        });

        const mappedUsers = res.data.map((user) => ({
          id: user.id,
          name: user.name.trim(),
          email: user.email,
          joinDate: user.createdate,
          phoneNumber:user.phoneNumber,
          Address:user.address,
          status: "Active", // or use user.status if available
          orders: Math.floor(Math.random() * 10),
          totalSpent: Math.floor(Math.random() * 1000),
          gender:user.gender
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }finally{
        setLoading(false)
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="text-sm text-gray-500">
          Total Users: {users.length} | Active:{" "}
          {users.filter((u) => u.status === "Active").length}
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Desktop View */}
      
        {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader className="animate-spin text-blue-500" size={40} />
              <span className="ml-3 text-gray-600">Loading Users...</span>
            </div>
          ) :(<div className="hidden sm:block overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Users</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Join Date</th>
               
                <th className="px-4 py-3 text-left text-gray-700 font-medium">User Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail size={12} className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {user.joinDate}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-base font-semibold text-gray-900">{user.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail size={12} className="mr-1" />
                  {user.email}
                </div>
              </div>
              <button
                onClick={() => viewUserDetails(user)}
                className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50"
              >
                <Eye size={18} />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Joined: {user.joinDate}
              </div>
              <div>Address: {user.Address}</div>
              
              <div>Mobile No: {user.phoneNumber}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
              <button
                onClick={() => toggleUserStatus(user.id)}
                className={`p-2 text-sm font-medium rounded-lg ${
                  user.status === "Active" ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"
                }`}
              >
                {user.status === "Active" ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-900">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-lg font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Join Date</label>
                <p>{selectedUser.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <p>{selectedUser.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Customer Address</label>
                <p>{selectedUser.Address}</p>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-blue-50">
                <label className="block text-sm font-medium text-blue-700">Phone Number</label>
                <p className="text-2xl font-bold text-blue-900">{selectedUser.phoneNumber}</p>
              </div>
             
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
