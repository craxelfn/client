"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '+1 123 456 7890',
    city: 'New York',
    address: '123 Main St',
    birthday: '1995-01-01',
    gender: 'male',
  });

  const [originalFormData, setOriginalFormData] = useState(formData);
  const [profileImage, setProfileImage] = useState<string>('/path/to/profile/image.jpg');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEmailChanging, setIsEmailChanging] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('johndoe@example.com');

  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [hasPasswordChanges, setHasPasswordChanges] = useState<boolean>(false); // Track password changes

  useEffect(() => {
    // Check if the current formData is different from the original data
    const isDifferent = JSON.stringify(formData) !== JSON.stringify(originalFormData);
    setHasChanges(isDifferent);
  }, [formData, originalFormData]);

  useEffect(() => {
    // Check if any password field has been modified
    const isPasswordDifferent =
      passwordData.oldPassword !== '' ||
      passwordData.newPassword !== '' ||
      passwordData.confirmPassword !== '';
    setHasPasswordChanges(isPasswordDifferent);
  }, [passwordData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Updated Information:', formData);
    setOriginalFormData(formData);
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Password Changed:', passwordData);
  };

  const handleEmailChangeSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Email Changed to:', newEmail);
    setEmail(newEmail);
    setNewEmail('');
    setIsEmailChanging(false);
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setHasChanges(false);
    setHasPasswordChanges(false); // Reset password change tracking
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-200 to-green-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full space-y-8">
        <h2 className="text-4xl font-bold text-center text-blue-600">Update Profile</h2>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <Avatar alt={formData.name} src={profileImage} sx={{ width: 100, height: 100 }} />
          <input
            accept="image/*"
            id="upload-photo"
            type="file"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <label htmlFor="upload-photo">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>

        {/* Non-sensitive Information Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="City"
              variant="outlined"
              name="city"
              fullWidth
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Birthday"
              variant="outlined"
              name="birthday"
              type="date"
              fullWidth
              value={formData.birthday}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </div>

          
          <div className="flex justify-end gap-3">
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
            {hasChanges && (
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Sensitive Information Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-center text-blue-600">Change Email</h3>
            <div className="flex flex-col space-y-4">
              {isEmailChanging ? (
                <form onSubmit={handleEmailChangeSubmit} className="space-y-4">
                  <TextField
                    label="New Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                  <TextField
                    label="Enter Password to Confirm"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div className="flex justify-end gap-3">
                    <Button variant="contained" color="primary" type="submit">
                      Change Email
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => setIsEmailChanging(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <TextField
                    label="Current Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    value={email}
                    disabled
                  />
                  <Button variant="contained" color="primary" onClick={() => setIsEmailChanging(true)}>
                    Change Email
                  </Button>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-center text-blue-600">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <TextField
                label="Old Password"
                variant="outlined"
                name="oldPassword"
                type="password"
                fullWidth
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                required
              />
              <TextField
                label="New Password"
                variant="outlined"
                name="newPassword"
                type="password"
                fullWidth
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <TextField
                label="Confirm New Password"
                variant="outlined"
                name="confirmPassword"
                type="password"
                fullWidth
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              <div className='w-full flex justify-end gap-3'>
                <Button variant="contained" color="primary" type="submit">
                  Change Password
                </Button>
                {hasPasswordChanges && ( 
                  <Button variant="outlined" color="error" onClick={() => setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
