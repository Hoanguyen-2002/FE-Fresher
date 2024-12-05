import React, { useState } from "react";
interface StarRatingProps {
  initialRating?: number;
}
const StarRating: React.FC<StarRatingProps> = ({
  initialRating = Math.random() * 5,
}) => {
  const [rating, setRating] = useState<number>(
    Math.round(initialRating * 10) / 10
  );
  const handleClick = (index: number) => setRating(index);
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onClick={() => handleClick(star)}
          className="relative size-6 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            viewBox="0 0 24 24"
            className="absolute left-0 top-0 size-full"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gold"
            viewBox="0 0 24 24"
            className="absolute left-0 top-0 size-full"
            style={{
              clipPath:
                rating >= star
                  ? "none"
                  : `inset(0 ${100 - (rating - star + 1) * 100}% 0 0)`,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};
export default StarRating;
