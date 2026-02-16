import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../slices/authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://tahrik-e-imaan-jeur.onrender.com/api/v1/auth" || "http://localhost:4000/api/v1/auth",
        credentials: "include"
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: body
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                    dispatch(authApi.endpoints.getProfile.initiate());
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ["User"],
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body: body
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                    dispatch(authApi.endpoints.getProfile.initiate());
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ["User"],
        }),
        getProfile: builder.query({
            query: () => "/me",
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/me",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["User"]
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                    dispatch(authApi.util.resetApiState());
                } catch (error) {

                }
            },
            invalidatesTags: ["User"]
        }),
        getAllUsers: builder.query({
            query: () => "/amir/users",
            providesTags: ["User"]
        }),
        getUserDetails: builder.query({
            query: (id) => `/amir/users/${id}`,
            providesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/amir/users/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/amir/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"]
        }),
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useLogoutUserMutation,
    useGetAllUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = authApi

export default authApi.reducer;