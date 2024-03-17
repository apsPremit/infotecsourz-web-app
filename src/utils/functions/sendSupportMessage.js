import axios from 'axios';
import React from 'react';
import { baseUrl } from './baseUrl';
import config from '@/config';

const sendSupportMessage = async (messageData) => {
  try {
    const res = await axios.post(
      `${config.api_base_url}/supports/create-support`,
      messageData
    );
    const data = await res.data;
    return data;
  } catch (error) {}
};

export default sendSupportMessage;
