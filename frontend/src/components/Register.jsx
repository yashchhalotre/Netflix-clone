import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../utils/constant";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created successfully. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative z-10 px-6 py-6 md:px-14">
        <h1 className="text-4xl font-extrabold text-red-600">NETFLIX</h1>
      </div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 mx-auto mt-12 w-[90%] max-w-md rounded bg-black/80 p-8 md:p-12"
      >
        <h2 className="mb-8 text-3xl font-bold">Create Account</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="mb-4 w-full rounded bg-zinc-800 p-4 outline-none"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded bg-zinc-800 p-4 outline-none"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded bg-zinc-800 p-4 outline-none"
          required
        />

        <button
          className="flex w-full items-center justify-center gap-3 rounded bg-red-600 py-3 font-bold hover:bg-red-700 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-5 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;