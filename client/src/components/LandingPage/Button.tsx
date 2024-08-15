import React from 'react'

type StyledButtonProps = {
  ClickEvent?: () => void;
  width?: string;
  height?: string;
  paddingX?: string;
  paddingY?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const StyledButton = ({ClickEvent, width, height, paddingX, paddingY, children}: StyledButtonProps) => {
  return (
    <button 
      className={`${width ? width: "w-auto"} ${height? height: "h-auto"} 
        ${paddingX? paddingX: "px-2"} ${paddingY? paddingY: "py-2"}
        font-denk bg-gray-100 hover:bg-gray-50 focus:bg-gray-50 rounded-md text-black
        font-bold text-l sm:text-xl md:text-2xl shadow-[2px_4px_10px_2px_rgba(0,0,0,0.5)]`}
      onClick={ClickEvent}
    >
      {children}
    </button>
  )
}

export default StyledButton;
