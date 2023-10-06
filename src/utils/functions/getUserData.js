import React from 'react';
import { baseUrl } from './baseUrl';
import axios from 'axios';

const getUserData = async (email) => {

    const res = await axios(`${baseUrl}/user/${email}`)
    const data = res.data
    return data
};

export default getUserData;