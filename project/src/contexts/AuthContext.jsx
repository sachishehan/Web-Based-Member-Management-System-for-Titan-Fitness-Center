/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock user database with two members
const mockUsers = [
  {
    memberId: 'member1',
    password: 'pass123',
    isFirstLogin: false,
    isApproved: true,
    name: 'Naveen Sandharuwan',
    profileImage: null,
    qrCode: null,
    qrCodeExpiry: null,
    paymentStatus: 'Paid',
    lastPayment: '2024-03-15',
    nextPaymentDue: '2024-04-15',
    paymentHistory: [
      { date: '2024-03-15', amount: 2500, status: 'Paid' },
      { date: '2024-02-15', amount: 2500, status: 'Paid' },
      { date: '2024-01-15', amount: 2500, status: 'Paid' }
    ],
    attendance: [
      { date: '2024-03-20', time: '09:30 AM', status: 'Checked In' },
      { date: '2024-03-18', time: '10:15 AM', status: 'Checked In' },
      { date: '2024-03-16', time: '08:45 AM', status: 'Checked In' }
    ],
    stats: {
      workoutsThisMonth: 15,
      hoursSpent: 25,
      caloriesBurned: 12500,
      streak: 5
    },
    workoutSchedule: [
      { day: 'Monday', workout: 'Chest and Triceps', trainer: 'Mannel Siriwardhana' },
      { day: 'Wednesday', workout: 'Back and Biceps', trainer: 'Sarath Kubukge' },
      { day: 'Friday', workout: 'Legs and Shoulders', trainer: 'Mannel Siriwardhana' }
    ]
  },
  {
    memberId: 'member2',
    password: 'pass123',
    isFirstLogin: false,
    isApproved: true,
    name: 'Sachintha Shehan',
    profileImage: null,
    qrCode: null,
    qrCodeExpiry: null,
    paymentStatus: 'Pending',
    lastPayment: '2024-02-15',
    nextPaymentDue: '2024-03-15',
    paymentHistory: [
      { date: '2024-02-15', amount: 2500, status: 'Paid' },
      { date: '2024-01-15', amount: 2500, status: 'Paid' },
      { date: '2024-12-15', amount: 2500, status: 'Paid' }
    ],
    attendance: [
      { date: '2024-03-19', time: '16:30 PM', status: 'Checked In' },
      { date: '2024-03-17', time: '15:45 PM', status: 'Checked In' },
      { date: '2024-03-15', time: '17:00 PM', status: 'Checked In' }
    ],
    stats: {
      workoutsThisMonth: 12,
      hoursSpent: 20,
      caloriesBurned: 10000,
      streak: 3
    },
    workoutSchedule: [
      { day: 'Tuesday', workout: 'Full Body Circuit', trainer: 'Sarath Kubukge' },
      { day: 'Thursday', workout: 'HIIT Training', trainer: 'Mannel Siriwardhana' },
      { day: 'Saturday', workout: 'Yoga and Stretching', trainer: 'Lianal Appuhami' }
    ]
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (memberId, password) => {
    const foundUser = mockUsers.find(u => u.memberId === memberId && u.password === password)
    if (foundUser) {
      if (!foundUser.isApproved) {
        throw new Error('Your account is awaiting admin approval.')
      }
      setUser(foundUser)
      return foundUser
    }
    throw new Error('Invalid credentials')
  }

  const register = (userData) => {
    const memberId = `MEMBER${mockUsers.length + 1}`
    const tempPassword = 'temp123'

    const newUser = {
      ...userData,
      memberId,
      password: tempPassword,
      isFirstLogin: true,
      isApproved: true,
      profileImage: null,
      qrCode: null,
      qrCodeExpiry: null,
      paymentStatus: 'Pending',
      lastPayment: null,
      nextPaymentDue: null,
      paymentHistory: [],
      attendance: [],
      stats: {
        workoutsThisMonth: 0,
        hoursSpent: 0,
        caloriesBurned: 0,
        streak: 0
      },
      workoutSchedule: []
    }
    mockUsers.push(newUser)
    return { memberId, tempPassword }
  }

  const generateQRCode = (memberId) => {
    const userIndex = mockUsers.findIndex(u => u.memberId === memberId)
    if (userIndex >= 0) {
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 24) // QR code expires in 24 hours
      
      mockUsers[userIndex].qrCode = memberId // In a real app, this would be encrypted
      mockUsers[userIndex].qrCodeExpiry = expiryDate.toISOString()
      setUser(mockUsers[userIndex])
      return true
    }
    return false
  }

  const checkIn = (memberId) => {
    const userIndex = mockUsers.findIndex(u => u.memberId === memberId)
    if (userIndex >= 0) {
      const now = new Date()
      const newAttendance = {
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'Checked In'
      }
      mockUsers[userIndex].attendance = [newAttendance, ...mockUsers[userIndex].attendance]
      mockUsers[userIndex].stats.workoutsThisMonth += 1
      setUser(mockUsers[userIndex])
      return true
    }
    return false
  }

  const resetPassword = (memberId, newPassword) => {
    const userIndex = mockUsers.findIndex(u => u.memberId === memberId)
    if (userIndex >= 0) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        password: newPassword,
        isFirstLogin: false
      }
      setUser(mockUsers[userIndex])
      return true
    }
    return false
  }

  const updateProfileImage = (memberId, imageUrl) => {
    const userIndex = mockUsers.findIndex(u => u.memberId === memberId)
    if (userIndex >= 0) {
      mockUsers[userIndex].profileImage = imageUrl
      setUser(mockUsers[userIndex])
    }
  }

  const updateProfile = (memberId, profileData) => {
    const userIndex = mockUsers.findIndex(u => u.memberId === memberId)
    if (userIndex >= 0) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...profileData
      }
      setUser(mockUsers[userIndex])
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      resetPassword, 
      updateProfileImage,
      updateProfile,
      generateQRCode,
      checkIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)