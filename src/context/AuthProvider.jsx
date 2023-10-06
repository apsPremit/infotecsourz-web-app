"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, OAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../utils/firebase/firebase.config";
import { ImSpinner2 } from "react-icons/im";
import getUserData from "@/utils/functions/getUserData";
import { baseUrl } from "@/utils/functions/baseUrl";


const auth = getAuth(app)

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (user?.email) {
            fetch(`${baseUrl}/user/${user?.email}`)
                .then(res => res.json())
                .then(data => setUserData(data?.data))
                .catch(error => console.log('user data error', error))
        }

    }, [user])


    // email password register 
    const registerWithEmailAndPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // email password login 

    const loginWthEmailAndPassword = (email, password) => {

        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login 
    const logInWithGoogle = () => {
        setLoading(true)
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    // apple login 

    const loginWithApple = () => {
        const appleProvider = new OAuthProvider('apple.com');
        return signInWithPopup(auth, appleProvider)
    }

    // logout 
    const logOut = () => {
        return signOut(auth)
    }

    const profileUpdate = async (updateUser = {}) => {
        setLoading(true);
        await updateProfile(auth.currentUser, updateUser);
        setUser((preUser) => ({ ...preUser, ...updateUser }));

    };
    const passwordUpdate = async (updateUser = {}) => {
        setLoading(true);
        await updateProfile(auth.currentUser, updateUser);
        setUser((preUser) => ({ ...preUser, ...updateUser }));

    };

    const passwordReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    const userInfo = {
        user,
        loading,
        registerWithEmailAndPassword,
        loginWthEmailAndPassword,
        logInWithGoogle,
        loginWithApple,
        logOut,
        profileUpdate,
        passwordUpdate,
        passwordReset,
        userData,
        setUserData
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            setLoading(false)

        })
        return () => unsubscribe()
    }, [user])

    // if (loading) {
    //     return <div className='flex h-screen items-center justify-center text-5xl text-main'><ImSpinner2 className='animate-spin' /></div>
    // }


    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export const UserAuth = () => useContext(AuthContext)