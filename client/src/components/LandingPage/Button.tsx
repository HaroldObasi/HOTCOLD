import React from 'react'

type StyledButtonProps = {
    ClickEvent: () => void;
    width?: number;
    height?: number;
    children?: React.ReactNode;
}

const StyledButton = ({ClickEvent, width, height, children}: StyledButtonProps) => {
  return (
    <button 
        className={`${width ? width: "w-auto"} ${height? height: "h-auto"} font-denk px-24 py-2 bg-gray-100 hover:bg-gray-50 focus:bg-gray-50 rounded-md text-black
                font-bold text-2xl font-bold shadow-[2px_4px_10px_2px_rgba(0,0,0,0.5)]`}
        onClick={ClickEvent}
    >
        {children}
    </button>
  )
}

export default StyledButton;
