import React from 'react'
import LoginForm from '../componenets/Loginform'
const Login = () => {
  return (
    <>
        <div className="h-screen bg-gradient-to-r from-blue-200 to-gray-100 flex flex-col justify-center items-center text-center px-4">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          Welcome to <span className="text-blue-500">Notedown</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Your Smart Space for Tasks & Deadlines
        </p>
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>

    </>
    
  )
}

export default Login