import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response=await axios.post('http://localhost:5000/api/Register', { username, password,phonenumber});
      if(response.status==200){
        setError('Successfully registered! You can now log in.');
      }
        setTimeout(() => {
            navigate('/');
        }, 2000);
    } catch (err) {
        console.error(err);
        setError('Registration failed. Try a different username.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create Account</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm font-semibold text-center">{error}</div>
      )}

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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <input type="tel" placeholder='Enter Phonenumber' value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)}className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </div>

      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{' '}
        <a href="/" className="text-blue-600 font-medium hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
