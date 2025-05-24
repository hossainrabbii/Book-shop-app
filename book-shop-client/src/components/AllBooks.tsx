import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import bookImg from "../assets/img.jpg";
import { IBook } from "./ABooks";
const AllBooks = () => {
  const {
    data: books,
    isFetching,
    isLoading,
    error,
  } = useGetAllBooksQuery(undefined);
  // Content based on loading, error, and empty state
  let content;
  console.log(books);
  // Check if it's loading or fetching
  if (isLoading || isFetching) {
    content = <p>Looking for books...</p>;
  }

  // Check for error
  else if (error) {
    content = <p>Network: {"Something went wrong"}</p>;
  }

  // If there are books available
  else if (books && books.data && books.data.length > 0) {
    content = (
      <div className="grid w-full gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center bg-gray-100 py-5 rounded">
        {books?.data?.map((book: IBook) => (
          <Link to={`/book/${book._id}`}>
            <div
              key={book._id}
              className="bg-white p-2 w-[20px] sm:w-[230px] md:w-[290px] h-[340px] lg:h-[400px] flex flex-col items-center text-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] [@media(max-width:1279px)]:w-[230px] transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-100 hover:bg-green-100 rounded"
            >
              <div className="overflow-hidden w-4/6 h-[240px]">
                <img src={bookImg} alt="img" className="w-full" />
              </div>
              <small className="p-1 bg-gray-100 rounded mt-2">
                {book?.category}
              </small>
              <span>
                <strong className="">{book?.name}</strong>
                <small> - {book.author}</small>
              </span>

              <p className="text-green-600">TK. {book?.price}</p>
              <Link to={`/book/${book._id}`} className="border p-1 mt-2">
                View Details
              </Link>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    content = <p>No books found.</p>;
  }

  return (
    <div>
      {content}

      <div>
        Exiting books are waiting for you{" "}
        <button>
          {" "}
          <Link to="/books">View All</Link>
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
