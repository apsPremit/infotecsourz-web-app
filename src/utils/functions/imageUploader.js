import React from 'react';
import { baseUrl } from './baseUrl';

const imageUploader = async (images) => {
    const res = await fetch(`http://localhost:5500/image`, {
        method: 'POST',
        body: images
    })
    const data = await res.json()


};

export default imageUploader;