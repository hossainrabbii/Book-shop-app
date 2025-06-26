import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";

import { IBook } from "../types/IBook";
import { Spinner } from "../utils/spinner";

const AllBooks = () => {
  const {
    data: books,
    isFetching,
    isLoading,
    error,
  } = useGetAllBooksQuery(undefined);

  const randomBooks = books?.data
    ? [...books.data].sort(() => 0.5 - Math.random()).slice(0, 8)
    : [];

  let content;
  // Check if it's loading or fetching
  if (isLoading || isFetching) {
    content = (
      <div className="w-full h-[400px] flex items-center justify-center  bg-white rounded my-12">
        <Spinner />
      </div>
    );
  }

  // Check for error
  else if (error) {
    content = <p>Network: {"Something went wrong"}</p>;
  } else if (books && books.data && books.data.length > 0) {
    content = (
      <div className="my-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore Our Featured Books
          </h2>
          <p className="text-gray-600 mt-2">
            A handpicked collection of must-reads and reader favorites — updated
            weekly.
          </p>
        </div>
        <div className="grid w-full gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center bg-gray-100 py-5 rounded">
          {randomBooks?.map((book: IBook) => (
            <Link to={`/book/${book._id}`} key={book._id}>
              <div
                key={book._id}
                className="bg-white h-[340px] lg:h-[400px] flex flex-col items-center text-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-100 hover:bg-green-100 rounded w-[170px] md:w-[200px] lg:w-[300px]"
              >
                <div className="overflow-hidden w-4/6 h-[240px]">
                  <img
                    src={book?.imageUrl}
                    alt="img"
                    className="w-full h-full object-contain"
                  />
                </div>

                <small className="p-1 bg-gray-100 rounded mt-2">
                  {book?.category}
                </small>
                <span>
                  <strong className="">{book?.name}</strong>
                </span>
                <small> {book.author}</small>

                <p className="text-green-600">৳ {book?.price}</p>
                <Link to={`/book/${book._id}`} className="border p-1 mt-2">
                  View Details
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="w-full h-[400px] flex items-center justify-center bg-white rounded my-12">
        <p className="text-lg font-semibold">No book added yet!</p>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default AllBooks;
