import { useEffect, useState } from "react";
import HalfRating from "./HalfRating";
import { useAppSelector } from "../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { useGetUserByEmailMutation } from "../redux/features/user/userApi";
import {
  useAddReviewMutation,
  useGetReviewByItemIdQuery,
} from "../redux/features/review/reviewApi";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { IReview } from "../types/IReview";

interface ReviewProps {
  bookId: string;
}

const Review = ({ bookId }: ReviewProps) => {
  const [rating, setRating] = useState<number>(3.5);
  const [reviewText, setReviewText] = useState<string>("");
  const itemId = bookId;
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const email = user?.email;
  const { data: reviews } = useGetReviewByItemIdQuery(itemId);
  const [getUserByEmail, { data: userData }] = useGetUserByEmailMutation();
  const [addReview] = useAddReviewMutation();

  useEffect(() => {
    if (token && email) {
      getUserByEmail(email);
    }
  }, [email, token, getUserByEmail, bookId]);

  const handleSubmit = async () => {
    const reviewData = {
      name: userData?.data?.user?.name || "Anonymous",
      review: reviewText,
      email: userData?.data?.user?.email,
      itemId: bookId,
      rating,
    };

    try {
      const res = await addReview(reviewData).unwrap();
      toast.success(res?.message || "Review posted successfully!");
      setRating(3.5);
      setReviewText("");
      // reset();
    } catch (error) {
      toast.error("Failed to post review");
    }
  };
  const hasReviewed = reviews?.data?.some(
    (review: IReview) => review.email === user?.email
  );

  return (
    <div className="w-full border border-[#DDDDDD] rounded-lg p-6 bg-white">
      <h2 className="text-xl border-b border-[#DDDDDD] mb-4">
        Reviews ({reviews?.data?.length})
      </h2>
      <div className="space-y-4 my-6">
        {reviews?.data?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews?.data?.map((rev: IReview) => (
            <div key={rev._id} className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                {rev.name.charAt(0).toUpperCase()}
              </div>
              <div className="bg-gray-100 rounded-xl p-4 w-full">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-sm text-gray-800">
                    {rev.name}
                  </h3>
                  <Rating
                    value={rev.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                <p className="text-gray-700 text-sm">"{rev.review}"</p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(rev.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <HalfRating value={rating} setValue={setRating} />

      <textarea
        className="border w-full mt-2 rounded border-amber-300 p-2"
        rows={4}
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      ></textarea>

      {token ? (
        <button
          onClick={handleSubmit}
          disabled={hasReviewed}
          className={`mt-3 px-4 py-2 rounded text-white cursor-pointer ${
            hasReviewed
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {hasReviewed ? "Already Reviewed" : "Submit Review"}
        </button>
      ) : (
        <p className="bg-gray-400 cursor-not-allowed mt-3 px-4 py-2 rounded text-white inline-block">
          Login to post a review
        </p>
      )}
    </div>
  );
};

export default Review;
