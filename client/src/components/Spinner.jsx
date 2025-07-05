import { useEffect, useState } from "react";

const Spinner = ({ spinnerRef, type }) => {
  const [second, setSecond] = useState(0);
  useEffect(() => {
    const count = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(count);
    };
  }, []);
  return (
    <dialog id="spinner-modal" className="modal" ref={spinnerRef}>
      <div className="modal-box gap-4 flex-col shadow-none bg-transparent flex items-center justify-center">
        <span className="loading loading-spinner loading-sm"></span>
        {type === "starting" && (
          <p className=" text-xs ">
            Preparing Server {second > 0 ? second + "s" : ""}
          </p>
        )}
      </div>
    </dialog>
  );
};

export default Spinner;
