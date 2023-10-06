"use client"
import { UserAuth } from '@/context/AuthProvider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const LogOutBtn = () => {
    const router = useRouter()
    const { logOut } = UserAuth()
    const handleLogOut = async () => {
        await logOut()
        Cookies.remove('access-token')
        router.push('/login')
    }
    return (
        <button onClick={handleLogOut} className='px-3 py-1.5 ml-2 bg-main text-white hover:bg-mainHover rounded border '>Logout</button>
    );
};

export default LogOutBtn;