import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const MemberContext = createContext();

// Initial example members
const initialMembers = [
  {
    id: 1,
    memberId: 'MEM001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    membershipType: 'premium',
    startDate: '2024-01-01',
    lastPaidDate: '2024-01-01',
    renewalDate: '2024-02-01',
    status: 'active',
    renewalStatus: 'pending',
    paymentHistory: [
      { date: '2024-01-01', amount: 99.99, type: 'Initial Payment' }
    ]
  },
  {
    id: 2,
    memberId: 'MEM002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, City, State',
    membershipType: 'basic',
    startDate: '2024-01-15',
    lastPaidDate: '2024-01-15',
    renewalDate: '2024-02-15',
    status: 'active',
    renewalStatus: 'paid',
    paymentHistory: [
      { date: '2024-01-15', amount: 29.99, type: 'Initial Payment' }
    ]
  },
  {
    id: 3,
    memberId: 'MEM003',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine St, City, State',
    membershipType: 'standard',
    startDate: '2024-01-20',
    lastPaidDate: '2024-01-20',
    renewalDate: '2024-02-20',
    status: 'pending',
    renewalStatus: 'pending',
    paymentHistory: [
      { date: '2024-01-20', amount: 49.99, type: 'Initial Payment' }
    ]
  }
];

// Action Types
const ACTIONS = {
  ADD_MEMBER: 'ADD_MEMBER',
  UPDATE_MEMBER: 'UPDATE_MEMBER',
  UPDATE_PAYMENT: 'UPDATE_PAYMENT',
  UPDATE_STATUS: 'UPDATE_STATUS',
  SET_MEMBERS: 'SET_MEMBERS'
};

// Initial State
const initialState = {
  members: initialMembers,
  loading: false,
  error: null
};

// Reducer
function memberReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false
      };

    case ACTIONS.ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, action.payload]
      };

    case ACTIONS.UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id ? action.payload : member
        )
      };

    case ACTIONS.UPDATE_PAYMENT:
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id
            ? {
                ...member,
                lastPaidDate: action.payload.paymentDate,
                renewalDate: action.payload.renewalDate,
                renewalStatus: 'paid',
                status: 'active',
                paymentHistory: [
                  ...member.paymentHistory,
                  {
                    date: action.payload.paymentDate,
                    amount: action.payload.amount,
                    type: 'Renewal Payment'
                  }
                ]
              }
            : member
        )
      };

    case ACTIONS.UPDATE_STATUS:
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id
            ? {
                ...member,
                status: action.payload.status,
                actionReason: action.payload.reason,
                actionDate: new Date().toISOString()
              }
            : member
        )
      };

    default:
      return state;
  }
}

export function MemberProvider({ children }) {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  // Actions
  const addMember = async (memberData) => {
    try {
      const newMember = {
        ...memberData,
        id: state.members.length + 1,
        memberId: `MEM${String(state.members.length + 1).padStart(3, '0')}`,
        paymentHistory: [{
          date: memberData.startDate,
          amount: getMembershipAmount(memberData.membershipType),
          type: 'Initial Payment'
        }]
      };

      dispatch({ type: ACTIONS.ADD_MEMBER, payload: newMember });
      toast.success('Member added successfully');
      return newMember;
    } catch (error) {
      toast.error('Failed to add member');
      throw error;
    }
  };

  const updateMember = async (memberId, memberData) => {
    try {
      const updatedMember = {
        ...memberData,
        id: memberId
      };
      dispatch({ type: ACTIONS.UPDATE_MEMBER, payload: updatedMember });
      toast.success('Member updated successfully');
      return updatedMember;
    } catch (error) {
      toast.error('Failed to update member');
      throw error;
    }
  };

  const updateMemberPayment = async (memberId, paymentDate, renewalDate, amount) => {
    try {
      dispatch({
        type: ACTIONS.UPDATE_PAYMENT,
        payload: { id: memberId, paymentDate, renewalDate, amount }
      });
      toast.success('Payment updated successfully');
    } catch (error) {
      toast.error('Failed to update payment');
      throw error;
    }
  };

  const updateMemberStatus = async (memberId, status, reason) => {
    try {
      dispatch({
        type: ACTIONS.UPDATE_STATUS,
        payload: { id: memberId, status, reason }
      });
      toast.success(`Member ${status} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} member`);
      throw error;
    }
  };

  // Helper function to get membership amount
  const getMembershipAmount = (membershipType) => {
    const prices = {
      basic: 29.99,
      standard: 49.99,
      premium: 99.99
    };
    return prices[membershipType] || 29.99;
  };

  const value = {
    members: state.members,
    loading: state.loading,
    error: state.error,
    addMember,
    updateMember,
    updateMemberPayment,
    updateMemberStatus,
    getMembershipAmount
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
}

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};