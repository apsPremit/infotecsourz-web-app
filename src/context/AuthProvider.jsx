"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "@/utils/functions/baseUrl";
import { useSession } from "next-auth/react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const session = useSession()


    useEffect(() => {
        if (session?.data?.user) {
            fetch(`${baseUrl}/user/${session?.data?.user?.email}`)
                .then(res => res.json())
                .then(data => setUserData(data?.data))
                .catch(error => {
                    setUserData({})

                })
        }
    }, [session])

    const userInfo = {
        userData,
        setUserData
    }


    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export const UserAuth = () => useContext(AuthContext)