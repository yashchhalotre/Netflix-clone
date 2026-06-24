import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../utils/constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('netflixUser', JSON.stringify(data.user));
      toast.success(data.message);
      navigate('/browse');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center opacity-45" />
      <div className="relative z-10 px-6 py-6 md:px-14"><h1 className="text-4xl font-extrabold text-red-600">NETFLIX</h1></div>
      <form onSubmit={handleLogin} className="relative z-10 mx-auto mt-12 w-[90%] max-w-md rounded bg-black/80 p-8 md:p-12">
        <h2 className="mb-8 text-3xl font-bold">Sign In</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="mb-4 w-full rounded bg-zinc-800 p-4 outline-none" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-6 w-full rounded bg-zinc-800 p-4 outline-none" />
        <button className="flex w-full items-center justify-center gap-3 rounded bg-red-600 py-3 font-bold hover:bg-red-700 disabled:opacity-70" disabled={loading}>
          {loading && <span className="spinner !h-5 !w-5" />} {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="mt-5 text-sm text-gray-400">New to Netflix? <Link to="/register" className="font-semibold text-white hover:underline">Create account</Link></p>
      </form>
    </main>
  );
};

export default Login;
