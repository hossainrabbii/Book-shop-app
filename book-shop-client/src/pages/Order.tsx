import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/features/book/bookApi";
import { Spinner } from "../utils/spinner";
import QuantitySelector from "../components/QuantitySelector";
import { useState } from "react";
import CheckoutSection from "../components/CheckoutSection";
import bookImg from "../assets/img.jpg";

const Order = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, error } = useGetBookByIdQuery(bookId);
  const book = data?.data?.book ?? {};

  const {
    discount,
    name,
    quantity,
    price,
    author,
    description,
    category,
    inStock,
  } = book;
  const [selectedQty, setSelectedQty] = useState(1);

  let bookPrice;
  if (discount > 0) {
    bookPrice = Math.round(price - (price * discount) / 100);
  } else {
    bookPrice = price;
  }
  if (quantity === 0) {
    return <p className="text-red-500 text-center">Out of stock</p>;
  }

  const handleQuantityChange = (qty: number) => {
    setSelectedQty(qty);
  };


  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <p>Something went wrong, check internet.</p>;
  } else {
    content = (
      <div className="flex gap-8 flex-col lg:flex-row justify-between items-start">
        <div className="flex gap-4 justify-between bg-[#FFFAF4] border border-[#DDDDDD] rounded-md p-2 items-center relative w-full lg:w-3/5">
          <div className="flex gap-4 items-center max-w-[60%]">
            <img src={bookImg} alt="" className="w-[90px] h-[120px] rounded" />
            <div className="">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p>{author}</p>
              <p className="">
                {discount > 0 ? (
                  <>
                    <span className="text-xl text-[#F65D4E]">
                      Tk. {bookPrice}
                    </span>
                    <span className="line-through text-[#777] text-md ml-2">
                      {price}
                    </span>
                  </>
                ) : (
                  <span className="text-xl text-[#F65D4E]">{bookPrice}</span>
                )}
              </p>
            </div>
          </div>
          <QuantitySelector stock={quantity} onChange={handleQuantityChange} />
          <p>{bookPrice * selectedQty} Tk.</p>
        </div>
        <div className="w-full lg:w-2/5">
          <CheckoutSection bookPrice={bookPrice} selectedQty={selectedQty} title={name} author={author} />
        </div>
      </div>
    );
  }

  return <div className="my-20 container mx-auto px-2">{content}</div>;
};

export default Order;
