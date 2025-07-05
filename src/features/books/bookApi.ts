import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BorrowSummaryResponse } from "../../types";


export const bookApi = createApi({
    reducerPath: "bookAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://library-management-api-nine-plum.vercel.app/api"
    }),

    tagTypes: ["Books", "BorrowSummary"],

    endpoints: (builder) => ({
        // GET ALL BOOKS WITH PAGINATION
        getBooks: builder.query({
            query: ({ page = 1, limit = 10 }) => `/books?page=${page}&limit=${limit}`,
            transformResponse: (response: { data: any[]; meta: any }) => ({
                books: response.data,
                meta: response.meta,
            }),
            providesTags: ["Books"],
        }),


        // GET BOOK BY ID
        getBookById: builder.query({
            query: (id: string) => `/books/${id}`,
            transformResponse: (res: { data: any }) => res.data,
            providesTags: ["Books"],
        }),


        // CREATE A BOOK
        createBook: builder.mutation({
            query: (newBook) => ({
                url: "/books",
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),


        // UPDATE A BOOK
        updateBook: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["Books"],
        }),


        // DELETE A BOOK
        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),


        // BORROW A BOOK
        borrowBook: builder.mutation({
            query: ({ bookId, quantity, dueDate }) => ({
                url: `/borrow/${bookId}`,
                method: "POST",
                body: { quantity, dueDate },
            }),
            invalidatesTags: ["Books"],
        }),


        // GET ALL BORROW BOOK SUMMARY
        getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
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