"use client";
import { useState } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Only for signup
    gender: '',
    phone: '',
    city: '',
    address: '',
    birthday: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Logic for login (call API here)
      console.log('Logging in with:', formData);
    } else {
      // Logic for signup (call API here)
      console.log('Signing up with:', formData);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left section with image */}
      <div className="relative bg-gray-100 w-full flex justify-center items-center p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-teal-500 opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-white text-center">
          <h1 className="text-4xl font-bold mb-5">Healthi</h1>
          <div className="text-lg mb-4">
            <p>Well qualified doctors</p>
            <p>Treat with utmost care</p>
          </div>
          <div className="bg-black bg-opacity-40 p-4 relative flex gap-5 items-center left-0 rounded-lg shadow-lg">
            <CalendarMonthIcon className='w-10 h-10' />
            <div>
              <p className="font-bold mb-2">Book an appointment</p>
              <p>Call/text/video/in-person</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right section for login/signup form */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? 'New to Healthi?' : 'Already have an account?'}{' '}
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={toggleForm}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {!isLogin && (
                <div className="flex flex-col">
                  <div className="flex space-x-1">
                    <TextField
                      label="Name"
                      variant="outlined"
                      name="name"
                      fullWidth
                      margin="normal"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      select
                      label="Gender"
                      variant="outlined"
                      name="gender"
                      fullWidth
                      margin="normal"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </TextField>
                  </div>
                  
                  <div className="flex space-x-2">
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      name="phone"
                      type="tel"
                      fullWidth
                      margin="normal"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="City"
                      variant="outlined"
                      name="city"
                      fullWidth
                      margin="normal"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <TextField
                      label="Address"
                      variant="outlined"
                      name="address"
                      fullWidth
                      margin="normal"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="Birthday"
                      variant="outlined"
                      name="birthday"
                      type="date"
                      fullWidth
                      margin="normal"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Log in' : 'Sign up'}
              </button>
            </div>

            {/* Social login/signup buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md flex items-center hover:bg-gray-100">
                <Image
                  className="rounded-full"
                  src="/assets/Google.png"
                  width={20}
                  height={20}
                  alt="Google"
                />
                Google
              </button>
              <button className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md flex items-center hover:bg-gray-100">
                <Image
                  className="rounded-full"
                  src="/assets/Facebook.png"
                  width={14}
                  height={14}
                  alt="Facebook"
                />
                Facebook
              </button>
              <button className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md flex items-center hover:bg-gray-100">
                <Image
                  className="rounded-full"
                  src="/assets/Apple.png"
                  width={20}
                  height={20}
                  alt="Apple"
                />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
