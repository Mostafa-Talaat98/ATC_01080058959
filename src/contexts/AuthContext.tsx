import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { toast } from '@/components/ui/sonner';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USERS_STORAGE_KEY = 'app_users';
const CURRENT_USER_KEY = 'current_user';

// Initial admin user
const INITIAL_ADMIN: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  password: 'password' // In a real app, this would be hashed
};

// Helper functions for user management
const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!storedUsers) {
    // Initialize with admin user if no users exist
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([INITIAL_ADMIN]));
    return [INITIAL_ADMIN];
  }
  return JSON.parse(storedUsers);
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Verify user still exists in the users list
        const users = getStoredUsers();
        const userExists = users.some(u => u.id === parsedUser.id && u.email === parsedUser.email);
        
        if (userExists) {
          setAuthState({
            user: parsedUser,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          // User no longer exists in the system
          localStorage.removeItem(CURRENT_USER_KEY);
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false
      });
      toast.success('Successfully logged in!');
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      toast.error('User with this email already exists');
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${Date.now()}`, // Use timestamp as ID
      name,
      email,
      password, // In a real app, this would be hashed
      role: 'user'
    };
    
    // Save updated users list
    saveUsers([...users, newUser]);
    
    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      isLoading: false
    });
    
    toast.success('Registration successful!');
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
