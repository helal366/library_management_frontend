import type { IBook, IBorrowRequest, IBorrowResponse, IBorrowSummary } from '@/interfaces/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL;
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Books', 'Borrow'],
    endpoints: (builder)=> ({
        getBooks: builder.query<IBook[], void>({
            query: ()=>'/books',
            providesTags: ['Books']
        }),
        deleteBook: builder.mutation<void, string>({
            query: (id)=>({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        }),
        createBook: builder.mutation<IBook, Omit<IBook, "_id" | "isAvailable" | "isbn">>({
            query: (bookData)=>({
                url: `/books`,
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ["Books"]
        }),
        
        updateBook: builder.mutation<IBook, Partial<Omit<IBook, "_id">> & { _id: string }>({
            query: ({_id, ...rest})=>({
                url: `/books/${_id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ["Books"]
        }),
        createBorrowBook: builder.mutation<IBorrowResponse,IBorrowRequest>({
            query: (borrowBookData)=>({
                url: `/borrow_books`,
                method: 'POST',
                body: borrowBookData
            }),
            invalidatesTags: ['Books', 'Borrow']
        }),
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: ()=>"/borrow_books",
            providesTags: ['Borrow']
        }),
        
    }),
});
export const {useGetBooksQuery, useDeleteBookMutation, useCreateBookMutation, useUpdateBookMutation, useCreateBorrowBookMutation, useGetBorrowSummaryQuery} = baseApi;