import config from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
import { tag } from './tag';
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.api_base_url,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${session?.user?.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(tag),

  endpoints: () => ({}),
});

export default baseApi;
