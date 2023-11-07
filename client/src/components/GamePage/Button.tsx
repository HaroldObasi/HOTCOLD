import React from "react";

type Props = {
  rating: "COLDER" | "COLD" | "HOT" | "WARMER";
};

const Button = (props: Props) => {
  return (
    <button
      className={`p-2 mx-1 rounded-md ${
        props.rating === "COLDER" || props.rating === "COLD"
          ? "bg-[#95EDF9]"
          : "bg-[#FFB774]"
      }`}
    >
      {props.rating}
    </button>
  );
};

export default Button;
