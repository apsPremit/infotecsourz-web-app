import axios from "axios";
import { baseUrl } from "./baseUrl";


const saveOrder = async (order) => {

    const res = await axios.post(`${baseUrl}/order`, order)
    const data = await res.data
    return data

};

export default saveOrder;