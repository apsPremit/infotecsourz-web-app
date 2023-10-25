import axios from 'axios';
import React from 'react';
import { baseUrl } from './baseUrl';

const sendSupportMessage = async (messageData) => {
    try {
        const res = await axios.post(`${baseUrl}/support`, messageData)
        const data = await res.data
        return data
    } catch (error) {

    }
};

export default sendSupportMessage;