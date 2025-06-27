import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { IBook } from "../types/IBook";
import { toast } from "react-toastify";

interface UpdateBookModalProps {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateBookModal = ({ bookId, isOpen, onClose }: UpdateBookModalProps) => {
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [formData, setFormData] = useState<IBook>({
    name: "",
    author: "",
    price: 0,
    imageUrl: "",
    category: "",
    description: "",
    quantity: 0,
    discount: 0,
  });
  const book = data?.data?.book;

  useEffect(() => {
    if (book) {
      const { _id, createdAt, updatedAt, ...rest } = book;
      setFormData(rest);
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "discount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateBook({ bookId, bookData: formData }).unwrap();
      if (res.success) {
        toast.success(res?.message || "Book upfated!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg z-10">
        <Dialog.Title className="text-xl font-bold mb-4">
          Update Book
        </Dialog.Title>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="">
            <div>
              Name: <br />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Author: <br />
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Price:
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Category:
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Quantity:
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div>
              Discount:
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount"
                className="input border border-[#eeeeee] p-2 mb-1 w-full rounded text-[#6f6f6f]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
};

export default UpdateBookModal;
