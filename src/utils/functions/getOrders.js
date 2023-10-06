import axios from 'axios';
import React from 'react';
import { baseUrl } from './baseUrl';


const getOrders = async (email) => {

    const res = await axios.get(`http://localhost:5500/order/va.habibur@gmail.com`)
    const data = await res.data;

};

export default getOrders;