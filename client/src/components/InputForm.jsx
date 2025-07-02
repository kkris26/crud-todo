import React from "react";

const InputForm = ({ submit, change, input }) => {
  return (
    <form onSubmit={submit}>
      <div className="join w-full ">
        <input
          className="input w-full placeholder:text-xs border-0 rounded-tl-md text-sm join-item shadow-none  border-base-200 p-4 focus:shadow-none focus:outline-0 focus:border-0"
          placeholder="Add New Task ..."
          onChange={change}
          value={input.title}
          required
          autoFocus
        />
        <button className="btn join-item rounded-none bg-base-300 rounded-tr-sm border-0">
          {input.id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
