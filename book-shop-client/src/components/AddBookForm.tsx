import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi";
import { toast } from "react-toastify";

interface BookFormData {
  name: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  imageUrl: string;
  discount: number;
  inStock?: boolean;
}

export default function AddBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    defaultValues: {
      inStock: true,
    },
  });

  const { data, isFetching, isLoading, error } =
    useGetAllCategoriesQuery(undefined);

  const [addBook] = useAddBookMutation();

  const onSubmit = async (data: BookFormData) => {
    const bookData = { ...data, inStock: true, discount: 0 };
    try {
      const res = await addBook(bookData).unwrap();
      toast.success(res?.message || "Book added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <>
      <title>Add Book</title>

      <div className="max-w-md mx-auto p-2 md:p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nname*/}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block font-medium">Author</label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.author && (
              <p className="text-red-500">{errors.author.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price (tk)</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be at least $1" },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a Category</option>
              {data?.data?.map((category: { _id: string; name: string }) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-medium">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
                min: { value: 1, message: "Must be at least 1" },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              {...register("imageUrl", { required: "Image URL is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}
