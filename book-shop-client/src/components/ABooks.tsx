import { useState, useMemo } from "react";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi";
import { Link } from "react-router-dom";
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
              className="bg-white h-[340px] lg:h-[400px] flex flex-col items-center text-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-100 hover:bg-green-100 rounded w-[170px] md:w-[200px] lg:w-[300px]"
            >
              <div className="overflow-hidden w-4/6 h-[240px]">
                <img
                  src={book?.imageUrl}
                  alt="img"
                  className="w-full lg:h-[220px] object-contain"
                />
              </div>
              <small className="p-1 bg-gray-100 rounded mt-2">
                {book?.category}
              </small>
              <span>
                <strong className="">{book?.name}</strong>
                <small> - {book.author}</small>
              </span>

              <p className="text-green-600">৳ {book?.price}</p>
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
    <>
      <div className="flex flex-col lg:flex-row gap-6 px-4 my-20">
        <aside className="w-full lg:w-1/4 space-y-4 lg:sticky lg:top-24">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, author, or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-full shadow-md outline-none focus:ring-2 focus:ring-blue-400 border border-blue-200"
          />

          {/* Sort By Price */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <label className="block mb-2 font-semibold text-gray-700">
              Sort By Price:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full p-2 border rounded outline-none"
            >
              <option value="">None</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
            <label className="flex justify-between items-center text-gray-700">
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value) || "")}
                className="bg-gray-100 p-2 rounded w-1/2 outline-none ml-2"
              />
            </label>
            <label className="flex justify-between items-center text-gray-700">
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
                className="bg-gray-100 p-2 rounded w-1/2 outline-none ml-2"
              />
            </label>
          </div>

          {/* Categories */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <strong className="block mb-2 text-gray-700">Categories</strong>
            <div className="space-y-2">
              {data?.data?.map((category: any) => (
                <label
                  key={category._id}
                  className="flex items-center text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="mr-2 accent-blue-500"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Book Grid */}
        <main className="w-full lg:w-3/4">{content}</main>
      </div>
    </>
  );
};

export default ABooks;
