import React from 'react'
import LoginForm from '../componenets/Loginform'
const Login = () => {
  return (
    <>
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-gray-100 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-2xl px-2 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-700 mb-4 leading-tight">
            Welcome to <span className="text-blue-500">Notedown</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            Your Smart Space for Tasks & Deadlines
          </p>
        </div>

        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-2 sm:px-4">
          <LoginForm />
        </div>
      </div>


    </>
    
  )
}

export default Login