import type { IBook } from '../interfaces/interfaces';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaTrash } from "react-icons/fa";
import { UpdateBookModal } from '@/components/modules/bookModules/UpdateBookModal';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/baseApi';
import Swal from "sweetalert2";
import { BorrowBookModal } from '@/components/modules/bookModules/BorrowBookModal';
import { cn } from '@/lib/utils';
const AllBooks = () => {
  
  const [deleteBook] = useDeleteBookMutation();
  const {data, isError, isLoading} = useGetBooksQuery(undefined);
  // console.log(data);
  if(isLoading){
    return <div>Loading</div>
  };
  if(isError){
    return <div>Something went wrong</div>
  }
 
  return (
    <section>
      <h3 className="h3">All Books are here:</h3>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-175">
          <TableCaption className="sr-only">All Books are here:</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.books?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                    No books found
                </TableCell>
              </TableRow>
            ):(
                data?.books?.map((book: IBook) => (
              <TableRow key={book._id || book.isbn }>
                <TableCell className="font-medium ">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell className={cn("font-semibold",{
                  'text-green-800': book.isAvailable === true,
                  'text-red-700': book.isAvailable === false,
                })}>
                  {book.isAvailable ? 'Available' : 'Unavilable'}
                </TableCell>
                <TableCell className="flex justify-end gap-5">
                  <button type='button' className='cursor-pointer' onClick={async()=>{
                    const result = await Swal.fire({
                       title: "Are you sure?",
                       text: "This book will be permanently deleted!",
                       icon: "warning",
                       showCancelButton: true,
                       confirmButtonColor: "#d33",
                       cancelButtonColor: "#3085d6",
                       confirmButtonText: "Yes, delete it!",
                    })
                    if(result.isConfirmed){
                      try {
                        await deleteBook(book._id).unwrap();

                        await Swal.fire({
                          title: "Deleted!",
                          text: "Book has been deleted.",
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false,
                        })
                      } catch{
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete book",
                            icon: "error",
                          });
                      }                      
                    }                    
                  }}>
                      <FaTrash fill='red'size={20}/>
                  </button>
                  <UpdateBookModal book={book}/>
                  <BorrowBookModal book={book}/>
                </TableCell>
              </TableRow>
            ))
            )}
            
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AllBooks;
