import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { IBook, ActionBookData} from '../../../interfaces/interfaces';
import type { RootState } from '../../store';
import { generateISBN13 } from '@/utils/generateISBN';

interface InitialBookState {
  books: IBook[];
}
const initialState: InitialBookState = {
  books: [
    {
      _id: nanoid(),
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      isbn: '9780743273565',
      description: 'A novel set in the Roaring Twenties.',
      copies: 5,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      genre: 'Science',
      isbn: '9780553380163',
      description: 'Explains cosmology, black holes, and the Big Bang.',
      copies: 3,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: '1984',
      author: 'George Orwell',
      genre: 'Fiction',
      isbn: '9780451524935',
      description: 'A dystopian novel about totalitarian surveillance.',
      copies: 4,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      isbn: '9780062316097',
      description: 'A brief history of humankind.',
      copies: 6,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      genre: 'Biography',
      isbn: '9780553296983',
      description: 'The writings of Anne Frank during WWII.',
      copies: 2,
      isAvailable: false,
    },
    {
      _id: nanoid(),
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      isbn: '9780590353427',
      description: 'A young wizard begins his magical journey.',
      copies: 8,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      isbn: '9780547928227',
      description: 'Bilbo Baggins goes on an unexpected adventure.',
      copies: 5,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Biography',
      isbn: '9780399590504',
      description: 'A memoir about growing up and pursuing education.',
      copies: 3,
      isAvailable: true,
    },
    {
      _id: nanoid(),
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      genre: 'Science',
      isbn: '9780199291151',
      description: 'An exploration of evolutionary biology.',
      copies: 4,
      isAvailable: false,
    },
    {
      _id: nanoid(),
      title: 'The Art of War',
      author: 'Sun Tzu',
      genre: 'History',
      isbn: '9781599869773',
      description: 'An ancient Chinese military strategy text.',
      copies: 7,
      isAvailable: true,
    },
  ],
};
const bookData =(data:ActionBookData):IBook=>{
  const _id= nanoid();
  const isbn = generateISBN13();
  const newBook = {
    _id,
    ...data,
    isbn,
    isAvailable: data.copies >0
  }
  return newBook
}
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<ActionBookData>)=>{
      console.log(state.books)
      const newBook = bookData(action.payload);
      state.books.push(newBook);
      console.log(state.books)
    },
    updateBook: (state, action : PayloadAction<IBook>)=>{
           const book = state.books.find(b=>b._id === action.payload._id);
           if(book){
            // Object.assign(task, action.payload)
            book.title = action.payload.title;
            book.description = action.payload.description;
            book.author = action.payload.author;
            book.genre = action.payload.genre;
            book.copies = action.payload.copies
           }
        },
    removeBook: (state, action:PayloadAction<string>)=>{
      state.books = state.books.filter(book=>book._id !==action.payload)
    }
  },
});

export const selectBooks = (state: RootState) => {
  return state.bookList.books;
};
export const {addBook, updateBook, removeBook} = bookSlice.actions;
export default bookSlice.reducer;
