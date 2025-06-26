import { useState } from "react";

const Ratings = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const labels: Record<string, string> = {
    "0.5": "Terrible 😢",
    "1": "Bad 😟",
    "1.5": "Not great 😕",
    "2": "Meh 😐",
    "2.5": "Okay 🙂",
    "3": "Good 😃",
    "3.5": "Nice 😄",
    "4": "Great 😁",
    "4.5": "Excellent 🤩",
    "5": "Perfect! 🏆",
  };

  const currentValue = hover || rating;

  return (
    <div className="flex flex-col items-start gap-2 p-4 bg-white rounded shadow-md w-fit">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => {
          const full = currentValue >= index;
          const half = currentValue >= index - 0.5 && currentValue < index;

          return (
            <div key={index} className="relative w-6 h-6 cursor-pointer">
              {/* Full gray star in background */}
              <span className="absolute text-gray-300 left-0 top-0">★</span>

              {/* Yellow full star if full */}
              {full && (
                <span
                  className="absolute text-yellow-400 left-0 top-0"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              )}

              {/* Yellow half star */}
              {half && (
                <span
                  className="absolute text-yellow-400 left-0 top-0 overflow-hidden w-1/2"
                  onClick={() => setRating(index - 0.5)}
                  onMouseEnter={() => setHover(index - 0.5)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              )}
              {/* Click/hover area for left (half) and right (full) */}
              <div
                className="absolute left-0 top-0 w-1/2 h-full z-10"
                onClick={() => setRating(index - 0.5)}
                onMouseEnter={() => setHover(index - 0.5)}
                onMouseLeave={() => setHover(0)}
              />
              <div
                className="absolute right-0 top-0 w-1/2 h-full z-10"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}
              />
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-600">
        {labels[currentValue.toString()] || "No rating yet"}
      </p>
      
    </div>
  );
};

export default Ratings;
