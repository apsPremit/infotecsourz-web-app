import baseApi from '../baseApi';

const revisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevisionImgUploadUrl: builder.mutation({
      query: (data) => ({
        url: `revisions/${data.orderId}/get-upload-url`,
        method: 'POST',
        body: data.data,
      }),
    }),
    deleteRevisionSingleImage: builder.mutation({
      query: (key) => ({
        url: `revisions/delete-image`,
        method: 'POST',
        body: { key },
      }),
    }),
  }),
});

export const {
  useGetRevisionImgUploadUrlMutation,
  useDeleteRevisionSingleImageMutation,
} = revisionApi;
