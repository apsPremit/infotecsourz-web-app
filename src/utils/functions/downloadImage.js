import axios from 'axios';
import React from 'react';
import { baseUrl } from './baseUrl';

const downloadImage = async (folderName) => {
    const res = await axios.get(`${baseUrl}/image?folderName=${folderName}`, {
        responseType: 'blob'
    })
    const data = res.data
    return data
};

export default downloadImage;