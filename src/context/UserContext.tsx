import { createContext } from "react";
import { useState } from "react";


type AuthUser = {
    email:string | null,
    name:string | null,
    id:number |null,
    isAuthenticated: boolean | null,
    role: string | null
    
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
    const [user,setUser] = useState<AuthUser | null>({name:localStorage.getItem('username'),email:localStorage.getItem('email'),isAuthenticated:(localStorage.getItem('isAuthenticated') === 'true'),id:Number(localStorage.getItem('userId')),role:localStorage.getItem('role')});
    return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
}
