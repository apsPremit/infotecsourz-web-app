import baseApi from '../baseApi';

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
      query: (data) => ({
        url: `/coupons/apply-coupon`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useApplyCouponMutation } = couponApi;
