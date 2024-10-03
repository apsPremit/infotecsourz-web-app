import baseApi from '../baseApi';

const revisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevisionImgUploadUrl: builder.mutation({
      query: (data) => ({
        url: `/images/generate-url`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteSingleRevisionImage: builder.mutation({
      query: (key) => ({
        url: `/images/delete-image`,
        method: 'POST',
        body: { key },
      }),
    }),
  }),
});

export const {
  useGetRevisionImgUploadUrlMutation,
  useDeleteSingleRevisionImageMutation,
} = revisionApi;
