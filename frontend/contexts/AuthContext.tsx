import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  userLoggedIn: boolean;
  isLoadingAuth: boolean;
}

// AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Listen to Firebase's authentication state changes
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      (authenticatedUser) => {
        setUser(authenticatedUser);
        setUserLoggedIn(!!authenticatedUser);
        setIsLoadingAuth(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoggedIn, isLoadingAuth }}>
      {!isLoadingAuth && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
