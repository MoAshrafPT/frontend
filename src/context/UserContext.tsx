import { createContext } from "react";
import { useState } from "react";


type AuthUser = {
    email:string,
    name:string
}

export type UserContextType = {
    user: any,
    setUser:any
};

type UserContextProviderType = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderType) =>{
    const [user,setUser] = useState<AuthUser | null>(null);
    return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
}