import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://notedown-project.onrender.com/api/Login', { username, password });
      sessionStorage.setItem('userId', res.data.userId);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg transition-all duration-300">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
    Welcome Back
  </h2>

  <div className="space-y-4 sm:space-y-5">
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
    />
    <button
      onClick={handleLogin}
      className="w-full py-2.5 sm:py-3 bg-blue-600 text-white font-semibold rounded-md sm:rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
    >
      Login
    </button>
  </div>

  <p className="text-xs sm:text-sm text-center text-gray-600 mt-5">
    Don’t have an account?{" "}
    <a href="/register" className="text-blue-600 font-medium hover:underline">
      Register here
    </a>
  </p>
</div>


  );
}


export default LoginForm;