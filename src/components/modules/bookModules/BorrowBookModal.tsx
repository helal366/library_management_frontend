import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import type {  IBookProps,  } from "@/interfaces/interfaces";
import { FaBookOpen } from "react-icons/fa";
import { useCreateBorrowBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { useState } from "react";

export function BorrowBookModal({book}:IBookProps) {
  const [open, setOpen]=useState(false)
  const [createBorrowBook, {isLoading}] = useCreateBorrowBookMutation();
  const handleBorrowBook=async()=>{

    try {
       const {isbn}= book;
        await createBorrowBook({isbn}).unwrap();
        Swal.fire({
        icon: "success",
        text: "Book borrowed successfully",
        timer: 2000,
        showConfirmButton: false,
          });
        setOpen(false)
    } catch(error:unknown) {
      const err = error as {data?: {message?: string}}
       Swal.fire({
           icon: "error",
           text: err?.data?.message || "Something went wrong",
           timer: 2500,
           showConfirmButton: false,
           showCancelButton: true
         })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <FaBookOpen 
              fill='green' 
              size={20} 
              className="cursor-pointer"
             />
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <p className=" text-center">Book Title:</p>
          <p className="text-lg font-semibold text-center">{book.title}</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleBorrowBook}
              disabled={book.copies <=0 || isLoading}>
                {isLoading? "Borrowing...": book.copies <= 0 ? "Out of Stock" : "Borrow Book"}
            </Button>
          </DialogFooter>
         
        </DialogContent>

    </Dialog>
  )
}


