import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/Login', { username, password });
      sessionStorage.setItem('userId', res.data.userId);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back</h2>
  
  <div className="space-y-5">
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
    <button
      onClick={handleLogin}
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Login
    </button>
  </div>

  <p className="text-sm text-center text-gray-600 mt-6">
    Don’t have an account?{" "}
    <a href="/register" className="text-blue-600 font-medium hover:underline">
      Register here
    </a>
  </p>
</div>

  );
}


export default LoginForm;