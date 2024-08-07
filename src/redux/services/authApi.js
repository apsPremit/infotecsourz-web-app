import baseApi from '../baseApi';
import { tag } from '../tag';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/web/register`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/web/verify-login`,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/web/change-password`,
        method: 'POST',
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/web/forget-password`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `/auth/web/verify-otp`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/web/reset-password`,
        method: 'POST',
        body: data,
      }),
    }),
    getCountries: builder.query({
      query: (data) => ({
        url: `https://raw.githubusercontent.com/apsPremit/country-code/main/country.json`,
        method: 'GET',
      }),
      providesTags: tag.COUNTRIES,
    }),
  }),
});

export const {
  useVerifyLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useGetCountriesQuery,
} = authApi;
