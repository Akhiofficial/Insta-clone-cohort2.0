// State level for management of state
import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    
    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}