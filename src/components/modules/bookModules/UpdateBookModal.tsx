import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm,  type SubmitHandler } from "react-hook-form";
import type { ActionBookData, IBookProps,  } from "@/interfaces/interfaces";
// import { useAppDispatch } from "@/redux/hook";
// import { updateBook } from "@/redux/features/book/bookSlice";
import { RiEdit2Fill } from "react-icons/ri";
import { useUpdateBookMutation } from "@/redux/api/baseApi";


export function UpdateBookModal({book}:IBookProps) {
  const form = useForm<ActionBookData>({
  defaultValues: {
    title: `${book.title}`,
    description: `${book.description}`,
    author: `${book.author}`,
    genre: `${book.genre}`,
    copies: Number(`${book.copies}`),
  },
});
const [updateBook, {isLoading, isError}] = useUpdateBookMutation();
if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Something went wrong</div>
  }
// const dispatch = useAppDispatch();
  const onSubmit:SubmitHandler<ActionBookData> = async(data)=>{
    console.log(data);
    const updateData={
        ...data,
        _id:book._id,
        isbn: book.isbn,
        isAvailable: Number(data.copies)>0
    }
    const {_id, ...rest} = updateData;
    await updateBook({_id, ...rest}).unwrap();
    // dispatch(updateBook(updateData))
    form.reset();
  }
  return (
    <Dialog>
     
        <DialogTrigger asChild>
          {/* <Button variant="outline" ></Button> */}
          <RiEdit2Fill fill='green' size={26} className="cursor-pointer"/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Book Info</DialogTitle>
            <DialogDescription>
              Update Book details info here and then press Submit.
            </DialogDescription>
          </DialogHeader>
          <form id="react_hook_form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Task title"
                      autoComplete="off"
                    />
                    <FieldDescription className="sr-only">
                      Provide a concise title for your task.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Task Description"
                      autoComplete="off"
                      rows={3}
                    />
                    <FieldDescription className="sr-only">
                      Provide a concise description for your task.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            <Controller
                name="genre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Genre</FieldLabel>
                
                    <Select
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                
                     <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Genre</SelectLabel>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Biography">Biography</SelectItem>
                      <SelectItem value="Fantasy">Fantasy</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                    </Select>
                
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="author"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author">Author</FieldLabel>
                    <Input
                      {...field}
                      id="author"
                      aria-invalid={fieldState.invalid}
                      placeholder="Task title"
                      autoComplete="off"
                    />
                    <FieldDescription className="sr-only">
                      Provide the author name.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
            name="copies"
            control={form.control}
            rules={{
              required: 'Copies is required',
              min: { value: 0, message: 'Copies can not be less than zero.' },
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-addbook-copies">Copies</FieldLabel>
                <Input
                  id="form-addbook-copies"
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                  placeholder="Copies of the book"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          </FieldGroup>
          
          <DialogFooter className="my-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
          </form>
        </DialogContent>

    </Dialog>
  )
}

