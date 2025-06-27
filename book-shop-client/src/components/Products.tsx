import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../redux/features/book/bookApi";
import { useState } from "react";
import { IBook } from "../types/IBook";
import UpdateBookModal from "./UpdateBookModal";
import { toast } from "react-toastify";
import { Spinner } from "../utils/spinner";
import { Link } from "react-router-dom";

const Products = () => {
  const { data: books, isLoading, error } = useGetAllBooksQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleUpdateClick = (id: string) => {
    setSelectedBookId(id);
    setIsModalOpen(true);
  };

  const [deleteBook] = useDeleteBookMutation();
  const handleClose = () => setIsModalOpen(false);
  let content;
  if (isLoading) {
    content = <Spinner />;
  }
  if (error) {
    content = <>Something went wrong!</>;
  }
  if (!error && !isLoading && books?.data?.length === 0) {
    content = <p className="text-gray-500 text-center mt-6">No Books found</p>;
  }
  if (books?.data?.length > 0) {
    content = (
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-orange-100 to-orange-200 text-gray-800">
              <th className="px-2 md:px-5 py-1 md:py-3 text-left text-sm font-semibold border-b border-orange-300 rounded-tl-lg">
                📚 Name
              </th>
              <th className="px-2 md:px-5 py-1 md:py-3 text-left text-sm font-semibold border-b border-orange-300">
                💰 Price (Tk)
              </th>
              <th className="px-2 md:px-5 py-1 md:py-3 text-left text-sm font-semibold border-b border-orange-300">
                🎯 Discount (%)
              </th>
              <th className="px-2 md:px-5 py-1 md:py-3 text-left text-sm font-semibold border-b border-orange-300">
                📦 Stock
              </th>
              <th className="px-2 md:px-5 py-1 md:py-3 text-left text-sm font-semibold border-b border-orange-300 rounded-tr-lg">
                ⚙️ Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books?.data?.map((item: IBook, index: number) => (
              <tr
                key={item._id}
                className={`text-sm ${
                  index % 2 === 0 ? "bg-white" : "bg-orange-50"
                } hover:bg-orange-100 transition`}
              >
                <td className="px-2 md:px-5 py-1 md:py-3 border-b border-gray-200">
                  <Link to={`/book/${item._id}`}>{item.name}</Link>
                </td>
                <td className="px-2 md:px-5 py-1 md:py-3 border-b border-gray-200">
                  {item.price}
                </td>
                <td className="px-2 md:px-5 py-1 md:py-3 border-b border-gray-200">
                  {item.discount}
                </td>
                <td className="px-2 md:px-5 py-1 md:py-3 border-b border-gray-200">
                  {item.quantity}
                </td>
                <td className="px-2 md:px-5 py-1 md:py-3 border-b border-gray-200 space-x-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition  mb-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateClick(item._id!)}
                    className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition mb-2"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Component */}
        {selectedBookId && (
          <UpdateBookModal
            bookId={selectedBookId}
            isOpen={isModalOpen}
            onClose={handleClose}
          />
        )}
      </div>
    );
  }
  const handleDelete = async (bookId: String | undefined) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Book?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteBook(bookId).unwrap();
        if (res.success) {
          toast.success(res?.message || "Book deleted!");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <>
      <title>All Books</title>
      {content}
    </>
  );
};

export default Products;
