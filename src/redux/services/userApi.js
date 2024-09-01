import baseApi from '../baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileImageUploadUlr: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/profile-image-upload-url`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileImageUploadUlrMutation } = userApi;
