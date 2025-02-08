import { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Optional: Use fetch if you prefer

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Base URL for your backend API
  const API_BASE_URL = 'http://localhost:5000/api/auth';

  // Login function
  const login = async (memberId, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { memberId, password });
      const foundUser = response.data;

      if (!foundUser.isApproved) {
        throw new Error('Your account is awaiting admin approval.');
      }

      setUser(foundUser);
      return foundUser;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      const { memberId, password } = response.data;
      return { memberId, password };
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  // Reset password function
  const resetPassword = async (memberId, newPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, { memberId, newPassword });
      if (response.data.success) {
        setUser((prevUser) => ({ ...prevUser, password: newPassword, isFirstLogin: false }));
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Password reset failed');
    }
  };

  // Update profile image function
  const updateProfileImage = async (memberId, imageUrl) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-profile-image`, { memberId, imageUrl });
      if (response.data.success) {
        setUser((prevUser) => ({ ...prevUser, profileImage: imageUrl }));
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update profile image');
    }
  };

  // Update profile function
  const updateProfile = async (memberId, profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-profile`, { memberId, profileData });
      if (response.data.success) {
        setUser((prevUser) => ({ ...prevUser, ...profileData }));
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        resetPassword,
        updateProfileImage,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);