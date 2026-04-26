export type Genre =
  | 'Fiction'
  | 'Non-Fiction'
  | 'Science'
  | 'History'
  | 'Biography'
  | 'Fantasy';

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}
export type ActionBookData = Omit<IBook, '_id' | 'isAvailable' | 'isbn'>;

export interface IBookProps {
  book: IBook;
}

export interface BorrowBookTitle{
    title:string
}
export interface IBorrowRequest{
  isbn: string
}
export interface IBorrowResponse{
  success: boolean,
  message: string,
  borrowBook: {
    bookTitle: string,
    isbn: string,
    totalQuantity: number,
    dueDate: string
  }
}