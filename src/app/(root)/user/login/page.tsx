"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSignup } from "../../../../hooks/useSignup";
import { useLogin } from "../../../../hooks/useLogin";
import Erreur from '../../../../components/Erreur/Erreur'; // Import the Erreur component

const Page = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const { login, error: loginError, isLoading: loginLoading } = useLogin();
  const { signup, error: signupError, isLoading: signupLoading } = useSignup();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState<'erreur' | 'Success' | 'Info' | 'Warning'>('erreur');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: '',
    age: '',
    phone: '',
    address: '',
    city: '',
    password: '',
    role: 'PATIENT' // Default role
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
  
    try {
      if (isLogin) {
        // Login logic
        const result = await login(formData.email, formData.password);
  
        if (result) {
          console.log(localStorage.getItem('user'))
          router.push('/home'); // Redirect to /home on successful login
        } else if (loginError) {
          setErrorMessage(loginError);
          setErrorType('erreur');
          setShowError(true);
        }
      } else {
        // Signup logic
        const result = await signup(formData);
  
        if (signupError) {
          setErrorMessage(signupError);
          setErrorType('erreur');
          setShowError(true);
        } else {
          setOpenVerificationDialog(true);
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      setErrorType('erreur');
      setShowError(true);
    }
  };
  

  const handleVerificationCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  const handleVerifyCode = () => {
    const fullCode = verificationCode.join('');
    console.log('Verification Code:', fullCode);
    // Add your verification logic here
    setOpenVerificationDialog(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset error state when switching forms
    setShowError(false);
  };

  return (
    <>
      {/* Error Component */}
      {showError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Erreur 
            type={errorType} 
            message={errorMessage} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Left section with image */}
        <div className="relative bg-gray-100 w-full flex justify-center items-center p-10">
          <div className="absolute w-full inset-0 bg-gradient-to-r from-blue-800 to-teal-500 opacity-60"></div>
          <Image
            className="w-full h-auto md:mx-20 lg:mx-20"
            src="/assets/nobgdoctor.png"
            layout="fill"
            objectFit="contain"
            alt="doctors"
          />
          <div className="relative w-full z-10 flex flex-col  items-start text-white">
            <h1 className="text-4xl font-bold mb-5">Healthi</h1>
            <div className="text-lg mb-4">
              <p>Well qualified doctors</p>
              <p>Treat with utmost care</p>
            </div>
            <div className="bg-black bg-opacity-40 p-4  flex gap-5 items-center rounded-lg shadow-lg">
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
                    <div className="flex space-x-2">
                      <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                      <TextField
                        select
                        label="Role"
                        variant="outlined"
                        name="role"
                        fullWidth
                        margin="normal"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                      >
                        <MenuItem value="PATIENT">Patient</MenuItem>
                        <MenuItem value="DOCTOR">Doctor</MenuItem>
                      </TextField>
                    </div>
                    
                    <div className="flex space-x-2">
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
                      <TextField
                        label="Age"
                        variant="outlined"
                        name="age"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
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
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loginLoading || signupLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLogin 
                    ? (loginLoading ? 'Logging in...' : 'Log in') 
                    : (signupLoading ? 'Signing up...' : 'Sign up')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Verification Dialog */}
      <Dialog 
        open={openVerificationDialog} 
        onClose={() => setOpenVerificationDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Verify Your Account</DialogTitle>
        <DialogContent>
          <p className="mb-4">Please enter the 6-digit verification code sent to your email.</p>
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <TextField
                key={index}
                variant="outlined"
                inputProps={{ 
                  maxLength: 1, 
                  style: { textAlign: 'center' } 
                }}
                value={digit}
                onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                className="w-12"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVerificationDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyCode} color="primary" variant="contained">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;