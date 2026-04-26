import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { ActionBookData } from '@/interfaces/interfaces';
// import { useAppDispatch } from '@/redux/hook';
// import { addBook } from '@/redux/features/book/bookSlice';
import { useCreateBookMutation } from '@/redux/api/baseApi';
import { generateISBN13 } from '@/utils/generateISBN';
import { useNavigate } from 'react-router';
const AddBook = () => {
  const navigate = useNavigate()
  const form = useForm<ActionBookData>({
    defaultValues: {
      title: '',
      author: '',
      genre: 'Fantasy',
      description: '',
      copies: 1,
    },
  });
  const [createBook, { isLoading, isError}] = useCreateBookMutation();
  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Something went wrong</div>
  }
  // const dispatch = useAppDispatch();
  const onSubmit:SubmitHandler<ActionBookData> = async(formData)=>{
    // console.log(formData);
    // dispatch(addBook(formData));
    const isbn = generateISBN13();
    const isAvailable= formData.copies >0;
    const book = {
      ...formData,
      isbn,
      isAvailable
    }
    await createBook(book).unwrap();
    form.reset();
    navigate('/all_books')
  };
  return (
    <section className="my-10">
      <form id="form-addbook" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
             rules={{ required: 'Title is required' }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-addbook-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-addbook-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Title of the book"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="author"
            control={form.control}
            rules={{ required: 'Description is required' }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-addbook-author">Author</FieldLabel>
                <Input
                  {...field}
                  id="form-addbook-author"
                  aria-invalid={fieldState.invalid}
                  placeholder="Author name."
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="genre"
            control={form.control}
            rules={{ required: 'Genre is required' }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Select Genre</FieldLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full max-w-48">
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-addbook-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-addbook-description"
                    placeholder="Add the Book description here."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums sr-only">
                      {field?.value?.length}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="sr-only">
                  Add the Book description here.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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

        <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => form.reset()}
              className="px-4 py-2 border rounded-md cursor-pointer bg-red-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="form-addbook"
              className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer"
            >
              Save Book
            </button>
          </div>
      </form>
    </section>
  );
};

export default AddBook;
