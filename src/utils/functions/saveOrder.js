import axios from "axios";
import { baseUrl } from "./baseUrl";


const saveOrder = async (order) => {
    try {
        const res = await axios.post(`${baseUrl}/order`, order)
        const data = await res.data
        return data
    } catch (error) {
        console.log('order error', error)
    }
};

export default saveOrder;