import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './frontend/pages/Login';
import Register from './frontend/pages/Register';
import Dashboard from './frontend/pages/Dashboard';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}