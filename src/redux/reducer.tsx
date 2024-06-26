import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { paths } from "src/paths";
import { GetToken } from "src/types/global";

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: paths.BASE_URL,
    prepareHeaders(headers) {
      if (GetToken()) {
        headers.set("authorization", GetToken());
      }
      return headers;
    },
  }),
  tagTypes: ["Admin", "Shop", "Rider", "Payment"],
  endpoints: (builder) => ({
    //login
    Login: builder.mutation({
      query: ({ body }) => ({
        url: "login",
        method: "POST",
        body: body,
      }),
    }),
    //userInformation
    userInfo: builder.query({
      query: ({ id }) => `me/${id}`,
    }),
    verifyToken: builder.query({
      query: () => "verifyToken",
    }),
    // Products
    getMedicines: builder.query({
      query: () => "allmedicines",
    }),
    deleteMedicines: builder.mutation({
      query: ({ id }) => ({
        url: `delete-medicine-admin/${id}`,
        method: "DELETE",
      }),
    }),
    getAddress: builder.mutation({
      query: ({ body }) => ({
        url: "get-address",
        method: "POST",
        body: body,
      }),
    }),
    getAddressById: builder.query({
      query: ({ id }) => `getaddress/${id}`,
    }),
    // Admins
    getAlladmin: builder.query({
      query: () => "alladmins",
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: ({ body }) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin"],
    }),

    getUserById: builder.query({
      query: ({ id }) => `thisuseraadmin/${id}`,
    }),
    deleteuser: builder.mutation({
      query: ({ id }) => ({
        url: `useradmin/${id}`,
        method: "DELETE",
      }),
    }),
    //customer
    getAllCustomers: builder.query({
      query: () => "allusersadmins",
    }),
    //vendor
    getAllVendorsProducts: builder.query({
      query: ({ id }) => `myproducts/${id}`,
    }),
    getAllVendors: builder.query({
      query: () => "allvendorsadmins",
    }),

    approveShop: builder.mutation({
      query: ({ id, body }) => ({
        url: `approve-shop/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Shop"],
    }),
    //shop
    getShopbyId: builder.query({
      query: ({ id }) => `singleshop/${id}`,
      providesTags: ["Shop"],
    }),
    getAllShops: builder.query({
      query: () => "allshops",
      providesTags: ["Shop"],
    }),
    deleteShops: builder.mutation({
      query: ({ id }) => ({
        url: `deleteshop/${id}`,
        method: "DELETE",
      }),
    }),
    getallRiders: builder.query({
      query: () => "allriders",
      providesTags: ["Rider"],
    }),
    getRiderById: builder.query({
      query: ({ id }) => `admin/rider/detail/${id}`,
    }),
    deleteRider: builder.mutation({
      query: ({ id }) => ({
        url: `rider/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rider"],
    }),
    addRider: builder.mutation({
      query: ({ body }) => ({
        url: "rider",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Rider"],
    }),
    //payment
    getAllPayments: builder.query({
      query: () => "paymentlist",
      providesTags: ["Payment"],
    }),
    createPayment: builder.mutation({
      query: ({ body }) => ({
        url: `create-payment-intent`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
    wallet: builder.query({
      query: () => "super-admin-wallet",
      providesTags: ["Payment"],
    }),
    getAllTransactions: builder.query({
      query: () => "alltransactions",
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useDeleteMedicinesMutation,
  useGetAlladminQuery,
  useCreateAdminMutation,
  useDeleteuserMutation,
  useGetAllCustomersQuery,
  useGetUserByIdQuery,
  useGetAllVendorsProductsQuery,
  useGetAllVendorsQuery,
  useGetAllShopsQuery,
  useGetShopbyIdQuery,
  useDeleteShopsMutation,
  useGetallRidersQuery,
  useGetRiderByIdQuery,
  useDeleteRiderMutation,
  useAddRiderMutation,
  useLoginMutation,
  useUserInfoQuery,
  useVerifyTokenQuery,
  useGetAllPaymentsQuery,
  useGetAllTransactionsQuery,
  useLazyGetAllPaymentsQuery,
  useWalletQuery,
  useGetAddressMutation,
  useGetAddressByIdQuery,
  useLazyGetAddressByIdQuery,
  useLazyUserInfoQuery,
  useLazyGetShopbyIdQuery,
  useApproveShopMutation,
  useCreatePaymentMutation,
} = API;
