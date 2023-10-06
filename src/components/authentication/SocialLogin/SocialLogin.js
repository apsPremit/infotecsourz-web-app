import { UserAuth } from "@/context/AuthProvider";
import createJWT from "@/utils/functions/createJWT";
import getUserData from "@/utils/functions/getUserData";
import saveUser from "@/utils/functions/saveUser";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { logInWithGoogle, setUserData } = UserAuth()
    const search = useSearchParams()
    const { replace } = useRouter()
    const [error, setError] = useState('')

    const handleGoogleLogin = () => {
        logInWithGoogle()
            .then(async result => {

                const newUser = { name: result?.user?.displayName || 'unknown', email: result?.user?.email }
                const newSavedUser = await saveUser(newUser)
                setUserData(newSavedUser.data)
                // set token 
                const token = await createJWT({ email: result?.email })

                Cookies.set('access-token', token?.accessToken, { expires: 2 })


                const redirectUrl = search.get('redirectUrl') || '/dashboard'
                replace(redirectUrl)



            })
            .catch(err => setError(err?.code?.split('/')[1]?.replace('-', ' ')))
    }

    return (
        <div>
            {
                error && <p className='text-sm text-center text-red-500 mb-3'>{error}</p>
            }
            <button onClick={handleGoogleLogin} className="flex items-center gap-x-3 py-2 text-center border border-shadow p-3 mb-5 w-full justify-center">
                <FcGoogle size={24} />
                <span> Sign in with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;