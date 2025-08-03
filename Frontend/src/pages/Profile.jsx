import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
    Role: "",
    createddate: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      // Step 2: Now call logout (to expire cookie)
      await fetch(import.meta.env.VITE_BACKEND_URL+"/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Step 1: Delete the account first
      await axios.delete(import.meta.env.VITE_BACKEND_URL+"/auth/api/delete", {
        data: { email: confirmEmail },
        withCredentials: true, // important for cookie-based auth
      });

      toast.success("Account deleted successfully");

      // Step 3: Clear browser storage and navigate
      localStorage.clear();
      
        navigate("/register", { replace: true });
      // setTimeout(() => {
      

      //   toast.success("Account deleted successfully");
      //   // window.location.reload();
      // }, 1000); // 1000ms = 1 second
    } catch (err) {
      console.error(
        "Failed to delete account:",
        err.response?.data || err.message
      );
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
      
        setLoading(true)
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/me", {
           withCredentials: true 
 
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
          Role: data.role,
          createddate: data.createdate,
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally{
setLoading(false)
      }
    };
    fetchProfile();
  }, [token]);

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
        import.meta.env.VITE_BACKEND_URL+"/api/users/updateprofile",
        formData,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true, // ✅ Send cookies with the request
        }
      );
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Please Upload Photo Again!");
    }
  };

  const handleLogout = async () => {
    // Optional: Tell backend to clear cookie (if needed)
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log(res.text());
    } catch (err) {
      console.error("Logout failed:", err);
    }

    // Clear local/session storage
    localStorage.clear();
    sessionStorage.clear();
    // sessionStorage.clear();
    toast.success("Logout!!");
    // Navigate to login cleanly
    navigate("/", { replace: true });

    window.location.reload()
  };
  const handleChangePassword = async () => {
    try {
      // const token = localStorage.getItem("token");
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+"/api/users/change-password",
        { oldPassword, newPassword },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true,
        }
      );
      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error("Failed to change password" + err);
    }
  };

  return  loading ? (
 <div className="flex items-center justify-center py-10">
          <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading Profile...</span>
        </div>
): (
 <div className="max-w-5xl p-4 mx-auto mt-6 bg-white shadow-xl sm:p-6 rounded-2xl">
  <Toaster position="top-center" />

  {/* Header */}
  <div className="flex flex-col items-start justify-between pb-4 mb-6 border-b sm:flex-row sm:items-center">
    <h2 className="text-2xl font-bold text-green-700 sm:text-3xl">Customer Profile</h2>
  </div>

  {/* Grid Layout for Profile Info */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {/* Profile Photo */}
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
        ["Login Date", "createddate"]
      ].map(([label, key]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-600 sm:text-base">
            {label}:
          </label>
          {isEditMode && key !== "createddate" ? (
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
      {/* Edit/Save Profile Button */}
      <button
        disabled={loadingEdit}
        onClick={async () => {
          setLoadingEdit(true);
          try {
            if (isEditMode) await handleSubmit();
            setIsEditMode(!isEditMode);
          } finally {
            setLoadingEdit(false);
          }
        }}
        className={`px-5 py-2 text-sm text-white transition rounded-full shadow sm:text-base ${
          loadingEdit
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loadingEdit ? "⏳ Saving..." : isEditMode ? "💾 Save Profile" : "✏️ Edit Profile"}
      </button>

      {/* Change Password Button */}
      <button
        disabled={loadingPassword}
        onClick={() => {
          setLoadingPassword(true);
          setTimeout(() => {
            setShowPasswordModal(true);
            setLoadingPassword(false);
          }, 300); // simulate slight delay if needed
        }}
        className={`px-5 py-2 text-sm text-white transition rounded-full shadow sm:text-base ${
          loadingPassword
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loadingPassword ? "⏳ Opening..." : "🔐 Change Password"}
      </button>

      {/* Logout Button */}
      <button
        disabled={loadingLogout}
        onClick={async () => {
          setLoadingLogout(true);
          try {
            await handleLogout();
          } finally {
            setLoadingLogout(false);
          }
        }}
        className={`px-5 py-2 text-sm text-white transition rounded-full shadow sm:text-base ${
          loadingLogout
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-800"
        }`}
      >
        {loadingLogout ? "⏳ Logging out..." : "🚪 Logout"}
      </button>

      {/* Delete Account Button */}
      <button
        disabled={loadingDelete}
        onClick={() => {
          setLoadingDelete(true);
          setTimeout(() => {
            setShowDeleteModal(true);
            setLoadingDelete(false);
          }, 300);
        }}
        className={`px-5 py-2 text-sm text-white transition rounded-full shadow sm:text-base ${
          loadingDelete
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loadingDelete ? "⏳ Preparing..." : "🗑 Delete Account"}
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

export default Profile;
