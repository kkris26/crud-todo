import React from "react";

const ModalWarning = ({ setRef, itemToDelete, action }) => {
  return (
    <dialog ref={setRef} id="my_modal_1" className="modal md:px-0 ">
      <div className="modal-box border border-base-200 max-w-100 ">
        <h3 className="font-bold text-md">Warning !</h3>
        <p className="pt-3 text-sm">
          Are you sure you want to delete <strong>{itemToDelete.title}</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-action border-t border-base-content/60 pt-4">
          <form method="dialog" className="flex gap-2">
            <button
              className="btn btn-error text-white btn-sm"
              onClick={() => action(itemToDelete.id)}
            >
              Delete
            </button>
            <button className="btn btn-sm">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalWarning;
