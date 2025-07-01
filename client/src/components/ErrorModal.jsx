const ErrorModal = ({ ref }) => {
  return (
    <dialog ref={ref} id="my_modal_1" className="modal">
      <div className="modal-box border border-base-200 w-100">
        <h3 className="font-bold text-lg">Error !</h3>
        <p className="py-4">Something went wrong !</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
