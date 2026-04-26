import type { IBorrowRequest, IBorrowResponse } from '@/interfaces/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL;
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Books'],
    endpoints: (builder)=> ({
        getBooks: builder.query({
            query: ()=>'/books',
            providesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id)=>({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        }),
        createBook: builder.mutation({
            query: (bookData)=>({
                url: `/books/`,
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ["Books"]
        }),
        
        updateBook: builder.mutation({
            query: ({_id, ...rest})=>({
                url: `/books/${_id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ["Books"]
        }),
        createBorrowBook: builder.mutation<IBorrowResponse,IBorrowRequest>({
            query: (borrowBookData)=>({
                url: `/borrow_books/`,
                method: 'POST',
                body: borrowBookData
            }),
            invalidatesTags: ["Books"]
        }),
        getBorrowSummary: builder.query({
            query: ()=>"/borrow_books/",
        })
    }),
});
export const {useGetBooksQuery, useDeleteBookMutation, useCreateBookMutation, useUpdateBookMutation, useCreateBorrowBookMutation, useGetBorrowSummaryQuery} = baseApi;