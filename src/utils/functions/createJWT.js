import { baseUrl } from "./baseUrl";


const createJWT = async (payload) => {

    try {
        const res = await fetch(`${baseUrl}/jwt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        console.log('token', data)

        return data


    } catch (error) {
        console.log(error)
    }
};

export default createJWT;