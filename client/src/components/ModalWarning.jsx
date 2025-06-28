import React from "react";

const ModalWarning = ({ setRef, itemToDelete, action }) => {
  return (
    <dialog ref={setRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">
          Are you sure you want to delete <strong>{itemToDelete.title}</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-action border-t border-base-content/60 pt-4">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-error text-white" onClick={() => action(itemToDelete.id)}>
              Delete
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalWarning;
