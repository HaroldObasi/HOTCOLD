import React from "react";

type StyledButtonProps = {
  ClickEvent: () => void;
  width?: string;
  height?: string;
  paddingX?: string;
  paddingY?: string;
  aspect?: string;
  children?: React.ReactNode;
};

const StyledButton = ({
  ClickEvent,
  width,
  height,
  paddingX,
  paddingY,
  aspect,
  children
}: StyledButtonProps) => {
  return (
    <button
      className={`${width ? width : "w-auto"} ${height ? height : "h-auto"}  ${
        aspect ? aspect : "aspect-auto"
      }  
        ${paddingX ? paddingX : "px-2"} ${paddingY ? paddingY : "py-2"}  
        font-denk bg-gray-100 hover:bg-gray-50 focus:bg-gray-50 rounded-md text-black aspect-[60/13]  bg-white text-darkgray
        font-bold text-l sm:text-xl md:text-2xl  hover:scale-[101%] ease-in-out duration-75 hover:shadow-[8px_7px_7px_-1px_rgba(0,0,0,0.5)] shadow-[4px_5px_7px_-1px_rgba(0,0,0,0.5)]`}
      onClick={ClickEvent}
    >
      {children}
    </button>
  );
};

export default StyledButton;
