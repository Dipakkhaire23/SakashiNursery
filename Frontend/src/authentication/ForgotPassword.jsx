import  { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (email.trim() === "") {
    setError("Please enter your email.");
    return;
  }

  setLoading(true); // Start loader
  setError("");
  setMessage("");

  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/forgot-password", {
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
    setError("Failed to send request. Please try again. " + err.message);
  } finally {
    setLoading(false); // Stop loader
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-100 via-green-50 to-green-200">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-center text-green-700">Forgot Password?</h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          Enter your registered email. We'll send you a reset link.
        </p>

        {error && <p className="mb-3 text-sm text-center text-red-600">{error}</p>}
        {message && <p className="mb-3 text-sm text-center text-green-600">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
  type="submit"
  className="flex items-center justify-center w-full py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
  disabled={loading}
>
  {loading ? (
    <svg
      className="w-5 h-5 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  ) : (
    "Send Reset Link"
  )}
</button>

        </form>

        <div className="mt-4 text-sm text-center">
          Remembered your password?{" "}
          <a href="/login" className="text-green-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
