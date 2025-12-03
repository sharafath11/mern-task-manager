"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "@/services/authService";
import { IUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { IUserContextType } from "@/types/propsType";




const UserContext = createContext<IUserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter()
     console.log("user",user)
  const fetchUser = async () => {
      const res = await authService.getUser(); 
      if (res?.ok) {
          setUser(res.data); 
      } else {
          setUser(null);
          router.push("/login")
      }
   
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside <UserProvider>");
  return ctx;
}
