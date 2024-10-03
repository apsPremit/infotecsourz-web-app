import baseApi from '../baseApi';

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTicket: builder.query({
      query: (userId) => ({
        url: `/supports/${userId}/supports`,
        method: 'GET',
      }),
      providesTags: ['supports'],
    }),
    createTicket: builder.mutation({
      query: (data) => ({
        url: `/supports/create-support`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['supports'],
    }),
  }),
});

export const { useGetAllTicketQuery, useCreateTicketMutation } = supportApi;
