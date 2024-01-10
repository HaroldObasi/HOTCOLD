import React, {useEffect, useRef} from "react";

type PlayModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  overlayClassName?: string;
};

const PlayModal = ({
  open,
  onClose,
  children,
  overlayClassName
}: PlayModalProps) => {
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
      className={` flex justify-center fixed inset-0 z-10 p-4 bg-[rgba(0,0,0,0.44)] ${overlayClassName}  ${
        open ? "block" : "hidden"
      }`}
      onClick={onOverlayClick}
    >
      <div className=" mt-28 w-[95%] h-fit flex justify-center" ref={container}>
        <div className="pb-5 overflow-hidden bg-[rgba(250,250,250,.6)] backdrop-blur-3xl  rounded-3xl shadow-xl border border-solid border-black w-full lg:w-[40%] 2xl:w-[30%]   ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlayModal;
