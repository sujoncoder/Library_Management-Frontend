import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const bookApi = createApi({
    reducerPath: "bookAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://library-management-api-nine-plum.vercel.app/api"
    }),

    tagTypes: ["Books"],

    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["Books"]
        }),

        getBookById: builder.query({
            query: (id: string) => `/books/${id}`
        }),

        createBook: builder.mutation({
            query: (newBook) => ({
                url: "/books",
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),


        updateBook: builder.mutation({
            query: ({ id, updateData }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["Books"]
        }),


        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),


        borrowBook: builder.mutation({
            query: ({ bookId, borrowData }) => ({
                url: `/borrow/${bookId}`,
                method: "POST",
                body: borrowData,
            }),
            invalidatesTags: ["Books"],
        }),


        getBorrowSummary: builder.query({
            query: () => "/borrow-summary",
        }),
    })

});


export const { useGetBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useBorrowBookMutation,
    useGetBorrowSummaryQuery
} = bookApi;