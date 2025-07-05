const Spinner = ({ spinnerRef }) => {
  return (
    <dialog id="spinner-modal" className="modal" ref={spinnerRef}>
      <div className=" bg-transparent flex items-center justify-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    </dialog>
  );
};

export default Spinner;
