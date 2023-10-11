import React, { useEffect, useRef } from 'react'

type PlayModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;    
}

const PlayModal = ({open, onClose, children}: PlayModalProps) => {

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", onKeyPress);
      return () => window.removeEventListener("keydown", onKeyPress);
  }, [onClose, open]);
    
  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) {         
      onClose();
    }
  };
 

  return (
    <div
      className={`fixed inset-0 z-10 p-4 bg-gray-900/50 ${open ? "block" : "hidden"}`} 
      onClick={onOverlayClick}
    >
      <div className="relative top-[10%] w-full max-w-[600px] mx-auto mt-8" ref={container}>
        <div className="pt-8 pb-12 overflow-hidden bg-gray-200/70 rounded-3xl shadow-xl">{children}</div>
      </div>
    </div>
  );
};

export default PlayModal;