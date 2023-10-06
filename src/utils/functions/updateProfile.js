import axios from 'axios';
import React from 'react';
import { baseUrl } from './baseUrl';

const updateProfile = async (email, updateData) => {
    const res = await axios.put(`${baseUrl}/user/${email}`, updateData);
    const data = res.data
    return data
};

export default updateProfile;