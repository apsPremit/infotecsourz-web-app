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
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} = userApi;
