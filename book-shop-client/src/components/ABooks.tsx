import { useState, useMemo } from "react";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi";
import { Link } from "react-router-dom";
import bookImg from "../assets/img.jpg";
import { IBook } from "../types/IBook";


const ABooks = () => {
  const {
    data: books,
    isFetching,
    isLoading,
    error,
  } = useGetAllBooksQuery(undefined);

  const { data } = useGetAllCategoriesQuery(undefined);
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | "">(
    ""
  );

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter books based on search, category, and price range
  const filteredBooks = useMemo(() => {
    if (!books?.data) return [];

    return (
      books.data
        .filter((book: IBook) => {
          // Filter by search term (name, author, or category)
          const matchesSearch = searchTerm
            ? (book.name &&
                book.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (book.author &&
                book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (book.category &&
                book.category.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

          // Filter by selected categories
          const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(book.category);

          // Filter by price range
          const matchesPrice =
            (minPrice === "" || book.price >= minPrice) &&
            (maxPrice === "" || book.price <= maxPrice);

          return matchesSearch && matchesCategory && matchesPrice;
        })
        // Sort by price if selected
        .sort((a: IBook, b: IBook) => {
          if (sortOrder === "lowToHigh") return a.price - b.price;
          if (sortOrder === "highToLow") return b.price - a.price;
          return 0;
        })
    );
  }, [books, searchTerm, selectedCategories, minPrice, maxPrice, sortOrder]);

  // Loading, error, and empty state handling
  let content;
  if (isLoading || isFetching) {
    content = <p>Loading books...</p>;
  } else if (error) {
    content = <p>Network: {"Something went wrong"}</p>;
  } else if (filteredBooks.length > 0) {
    content = (
      <div className="grid w-full gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 place-items-center bg-gray-100 py-5 rounded">
        {filteredBooks.map((book: IBook) => (
          <Link to={`/book/${book._id}`}>
            <div
              key={book._id}
              className="bg-white p-2 w-[20px] sm:w-[230px] md:w-[290px] h-[420px] flex flex-col items-center text-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] [@media(max-width:1279px)]:w-[230px] transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-100 hover:bg-green-100 rounded"
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
    <div className="flex gap-4 flex-col lg:flex-row">
      {/* Filters UI */}

      <div className="mb-4 flex flex-row lg:flex-col w-full lg:w-1/5 gap-4 sticky top-20 h-screen">
        <input
          type="text"
          placeholder="Search by name, author, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-full outline-none w-full md:1/4 lg:w-full"
        />

        <div className="p-4 rounded shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-white  w-1/2 w-2/3 md:w-1/4 lg:w-full">
          <label>
            Sort By Price:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="outline-none"
            >
              <option value="">None</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </label>
        </div>

        <div className="p-4 rounded shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-white  w-1/2 md:1/4 lg:w-full">
          <label className="flex justify-between mb-2 ">
            Min Price:
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : "")
              }
              className="bg-gray-100 p-1 w-2/4 outline-none"
            />
          </label>
          <label className="flex justify-between mb-2">
            Max Price:
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : "")
              }
              className="bg-gray-100 p-1 w-2/4 outline-none"
            />
          </label>
        </div>

        <div className="p-4 rounded shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-white  w-1/2 md:1/4 lg:w-full">
          <strong className="mb-4">Categories</strong>
          <div className="flex flex-col">
            {data?.data?.map((category: { _id: string; name: string }) => (
              <label key={category._id} className="">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => toggleCategory(category.name)}
                />
                <span className="ml-2"> {category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* content */}
      <div className="w-full lg:w-4/5">{content}</div>
    </div>
  );
};

export default ABooks;
