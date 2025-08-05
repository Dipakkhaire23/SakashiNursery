import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AdminProfile = ({ setAuthenticated, setUserRole }) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dob: "",
    image: "",
    role: "",
    createdDate: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  // Delete account (delete first, then logout)
  const handleDeleteAccount = async () => {
    try {
      // Step 1: Delete the account
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/api/delete`, {
        data: { email: confirmEmail },
        withCredentials: true,
      });

      toast.success("Account deleted successfully");

      // Step 2: Logout user after deletion
      await handleLogout();
    } catch (err) {
      console.error("Failed to delete account:", err.response?.data || err.message);
      toast.error(
        "Failed to delete account: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleConfirmDelete = () => {
    if (confirmEmail === profile.email) {
      handleDeleteAccount();
    } else {
      toast.error("Email does not match");
    }
  };

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          withCredentials: true, // Send session cookie
        });

        const data = res.data;
        const base64Image = data.imagedata
          ? `data:${data.type};base64,${data.imagedata}`
          : "";

        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender || "",
          dob: data.dob || "",
          image: base64Image,
          role: data.role,
          createdDate: data.createdate,
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const dto = {
      name: profile.name,
      email: profile.email,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      gender: profile.gender || null,
      dob: profile.dob || null,
    };

    formData.append(
      "userprofileacceptdto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/updateprofile`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Profile update failed. Try again.");
    }
  };

const handleLogout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    localStorage.clear();
    setAuthenticated(false);
    setUserRole(null);  // Immediately reset role
    toast.success("Logged out!");
    navigate("/home", { replace: true });  // Always to public home
     window.location.reload()
  }
};


  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error("Failed to change password. Try again.");
    }
  };

  return loading ? (
    // Spinner while loading
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="max-w-5xl p-4 mx-auto mt-6 bg-white shadow-xl sm:p-6 rounded-2xl">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col items-start justify-between pb-4 mb-6 border-b sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-green-700 sm:text-3xl">
          ADMIN Profile
        </h2>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Photo */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              profile.image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="object-cover border-4 border-green-600 rounded-full shadow-md w-28 h-28 sm:w-36 sm:h-36"
          />

          {isEditMode && (
            <>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 text-sm text-gray-500"
              />
              {profile.image && (
                <button
                  onClick={() => setProfile((prev) => ({ ...prev, image: "" }))}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remove Image
                </button>
              )}
            </>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-5 md:col-span-2">
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone Number", "phoneNumber"],
            ["Address", "address"],
            ["Date of Birth", "dob"],
            ["Gender", "gender"],
            ["Login Date", "createdDate"],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 sm:text-base">
                {label}:
              </label>
              {isEditMode && key !== "createdDate" ? (
                key === "gender" ? (
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-sm border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={key === "dob" ? "date" : "text"}
                    name={key}
                    value={profile[key]}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-sm border rounded"
                  />
                )
              ) : (
                <p className="mt-1 text-sm text-gray-800">{profile[key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-10 sm:justify-start">
        <button
          onClick={async () => {
            if (isEditMode) await handleSubmit();
            setIsEditMode(!isEditMode);
          }}
          className="px-5 py-2 text-sm text-white transition bg-green-600 rounded-full shadow hover:bg-green-700 sm:text-base"
        >
          {isEditMode ? "💾 Save Profile" : "✏️ Edit Profile"}
        </button>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="px-5 py-2 text-sm text-white transition bg-blue-600 rounded-full shadow hover:bg-blue-700 sm:text-base"
        >
          🔐 Change Password
        </button>

        <button
          onClick={handleLogout}
          className="px-5 py-2 text-sm text-white transition bg-gray-700 rounded-full shadow hover:bg-gray-800 sm:text-base"
        >
          🚪 Logout
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-5 py-2 text-sm text-white transition bg-red-600 rounded-full shadow hover:bg-red-700 sm:text-base"
        >
          🗑 Delete Account
        </button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-red-700">
              Confirm Account Deletion
            </h3>
            <p className="mb-2 text-sm">Enter your email to confirm:</p>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded"
                onClick={handleConfirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-bold">Change Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-green-600 rounded"
                onClick={handleChangePassword}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
