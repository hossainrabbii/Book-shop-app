// HalfRating.tsx
import { Dispatch, SetStateAction } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const ratingLabels: Record<number, string> = {
  0.5: "😵 Awful",
  1: "😖 Very Bad",
  1.5: "😞 Bad",
  2: "😐 Not Great",
  2.5: "😶 Okay",
  3: "🙂 Decent",
  3.5: "😊 Nice",
  4: "😀 Good",
  4.5: "😎 Excellent",
  5: "🤩 Outstanding!",
};

export default function HalfRating({ value, setValue }: Props) {
  return (
    <Stack spacing={2}>
      <div className="flex items-center gap-4">
        <Rating
          name="controlled-rating"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            if (newValue !== null) setValue(newValue);
          }}
        />
        <strong>{ratingLabels[value]}</strong>
      </div>
    </Stack>
  );
}
