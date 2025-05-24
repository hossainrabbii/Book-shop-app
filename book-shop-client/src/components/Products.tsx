import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { useState } from "react";
import { IBook } from "../types/IBook";
import UpdateBookModal from "./UpdateBookModal";

const Products = () => {
  const { data: books, isLoading, error } = useGetAllBooksQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleUpdateClick = (id: string) => {
    setSelectedBookId(id);
    setIsModalOpen(true);
  };
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  let content;
  if (isLoading) {
    content = <>Loading..</>;
  }
  if (error) {
    content = <>Something went wrong!</>;
  }
  if (!error && !isLoading && books?.length == 0) {
    content = <p>No book, add new book</p>;
  }
  if (books?.data?.length > 0) {
    content = (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price(Tk)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Discount(%)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Stock
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books?.data?.map((item: IBook) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.discount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateClick(item?._id!)}
                    className="text-blue-600 hover:underline"
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
  // const { data } = useGetAllCategoriesQuery(undefined);
  const handleDelete = (id: String | undefined) => {
    console.log(id);
  };
  return content;
};

export default Products;
