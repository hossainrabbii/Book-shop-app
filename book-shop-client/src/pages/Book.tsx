import { Link, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/features/book/bookApi";
import { Spinner } from "../utils/spinner";
import { IBook } from "../types/IBook";
import Review from "../components/Review";

const Book = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, error } = useGetBookByIdQuery(bookId);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <p>Something went wrong, check internet.</p>;
  } else {
    const {
      discount,
      name,
      quantity,
      price,
      author,
      description,
      category,
      inStock,
      imageUrl,
    } = data?.data?.book;
    content = (
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 mt-16 mb-8">
          <div className="flex flex-col w-full lg:w-80%  gap-8 ">
            <div className="flex gap-4 flex-col lg:flex-row ">
              <div className="w-full lg:w-[45%] p-6 border border-[#DDDDDD] rounded-lg max-h-[450px] lg:max-h-[550px] relative overflow-hidden bg-white">
                {discount > 0 && (
                  <div className="p-2 bg-orange-600 absolute top-[-5px] left-[-5px] text-4xl opacity-80 text-white">
                    {discount}% OFF
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full lg:w-[55%] border border-[#DDDDDD] rounded-lg p-6 bg-white">
                <div className="border-b border-[#DDDDDD] pb-4">
                  <p>
                    {quantity > 0 ? (
                      <span className="border border-green-400 bg-green-100 text-green-500 px-1 rounded">
                        In stock
                      </span>
                    ) : (
                      <span className="border border-red-400 bg-red-100 text-red-500 px-1">
                        Not available
                      </span>
                    )}
                  </p>
                  <h1 className="text-4xl font-bold py-4">{name}</h1>
                  <div className="text-sm flex justify-between">
                    <p>
                      <span className="text-gray-400">Author: </span> {author}
                    </p>
                    <p>
                      <span className="text-gray-400">Category: </span>
                      {category}
                    </p>
                  </div>
                </div>
                <div className="border-b py-4 border-[#DDDDDD]">
                  <p>{description}</p>
                </div>
                <div className="border-b py-4 border-[#DDDDDD]">
                  <p className="text-3xl text-[#F65D4E]">
                    ৳
                    {discount > 0 ? (
                      <>
                        <span>
                          {" "}
                          {Math.round(price - (price * discount) / 100)}
                        </span>
                        <span className="line-through text-[#777] text-xl ml-2">
                          {price}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl text-[#F65D4E]">{price}</span>
                    )}
                  </p>
                  <button disabled={inStock}>
                    <Link
                      to={`/order/${bookId}`}
                      className="border rounded-full px-8 py-2 bg-[#F65D4E] hover:bg-[#F4402F] border-[#F65D4E] text-xl text-white inline-block mt-4"
                    >
                      Buy Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            {bookId ? <Review bookId={bookId} /> : <></>}
          </div>
          <div className="w-full lg:w-[20%] border border-[#DDDDDD] rounded-lg p-6 bg-white">
            <h2 className="text-xl border-b border-[#DDDDDD] mb-4">
              Related Books
            </h2>
            <div className="flex flex-wrap lg:block justify-between">
              {data?.data?.relatedBooks.map((book: IBook) => (
                <div
                  key={book._id}
                  className="p-2 border-b border-[#DDDDDD] w-[47%] lg:w-full bg-gray-100 mb-2 rounded gap-2"
                >
                  <Link to={`/book/${book._id}`}>
                    <img
                      src={book?.imageUrl}
                      alt="Book Image"
                      className="lg:h-[180px] m-auto object-contain"
                    />
                    <p className="text-sm">{book?.name}</p>
                    <p className="text-sm text-[#F65D4E]">৳ {book?.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {content}
    </div>
  );
};

export default Book;
