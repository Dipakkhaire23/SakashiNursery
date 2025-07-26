import  { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

   try {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  if (response.ok) {
    setMessage("If this email exists, a reset link has been sent.");
    setEmail("");
  } else {
    const errorData = await response.json();
    setError(errorData.message || "Something went wrong.");
  }
} catch (err) {
  setError("Failed to send request. Please try again."+err);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-2">Forgot Password?</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your registered email. We'll send you a reset link.
        </p>

        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3 text-center">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Remembered your password?{" "}
          <a href="/login" className="text-green-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
