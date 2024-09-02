import baseApi from '../baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileImage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/update-profile-image`,
        method: 'PATCH',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/update-profile`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileImageMutation, useUpdateProfileMutation } =
  userApi;
