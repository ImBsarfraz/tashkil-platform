import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tashkilApi = createApi({
    reducerPath: "tashkilApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://tahrik-e-imaan-jeur.onrender.com/api/v1/tashkil" || "http://localhost:4000/api/v1/tashkil",
        credentials: "include"
    }),
    tagTypes: ["Tashkil"],
    endpoints: (builder) => ({
        getAllTashkils: builder.query({
            query: (params = {}) => {
                const { keyword = "", page = 1, limit = 5 } = params;
                return `/?keyword=${keyword}&page=${page}&limit=${limit}`;
            },
            providesTags: (result) =>
                result ? [
                    ...result.tashkils.map(({ _id }) => ({
                        type: "Tashkil",
                        id: _id
                    })),
                    { type: "Tashkil", id: "LIST" }
                ]
                    : [{ type: "Tashkil", id: "LIST" }]
        }),
        getTashkilDetails: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Tashkil"]
        }),
        getMyTashkils: builder.query({
            query: () => "/my-tashkils",
            providesTags: ["Tashkil"],
        }),
        createTashkil: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Tashkil"]
        }),
        updateTashkil: builder.mutation({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Tashkil"],
        }),
        deleteTashkil: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tashkil"]
        })
    })
});

export const {
    useGetAllTashkilsQuery,
    useGetTashkilDetailsQuery,
    useGetMyTashkilsQuery,
    useCreateTashkilMutation,
    useUpdateTashkilMutation,
    useDeleteTashkilMutation

} = tashkilApi;

export default tashkilApi.reducer;