import baseApi from '../baseApi';

const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUploadUrl: builder.mutation({
      query: (data) => ({
        url: `/images/generate-url`,
        method: 'POST',
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: data.url,
        method: 'PUT',
        body: data.file,
      }),
    }),
    deleteSingleImage: builder.mutation({
      query: (key) => ({
        url: `/images/delete-image`,
        method: 'POST',
        body: { key },
      }),
    }),
  }),
});

export const {
  useGetUploadUrlMutation,
  useUploadImageMutation,
  useDeleteSingleImageMutation,
} = imageApi;
