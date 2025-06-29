import React from "react";

const InputForm = ({ submit, change, input }) => {
  return (
    <form onSubmit={submit}>
      <div className="join w-full rounded-t-md">
        <input
          className="input w-full placeholder:text-xs border-0 rounded-tl-md text-sm join-item  border-base-200 p-4 focus:outline-0 focus:border-t"
          placeholder="Add New Task ..."
          onChange={change}
          value={input.title}
          required
        />
        <button className="btn join-item rounded-none rounded-tr-sm">
          {input.id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
