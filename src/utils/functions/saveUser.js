import Cookies from "js-cookie";
import { baseUrl } from "./baseUrl";


const saveUser = async (userData) => {

    const token = Cookies.get('access-token');
    const res = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    const data = await res.json()
    return data

};

export default saveUser;