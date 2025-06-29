import { AnimatePresence } from "motion/react";
import { MotionSlide, MotionUp } from "./MotionInOut";
import ButtonIcon from "./ButtonIcon";
import { AiOutlineEdit } from "react-icons/ai";
import { LuTrash } from "react-icons/lu";

const TodoList = ({
  todos,
  loading,
  update,
  handleCheck,
  handleUpdate,
  handleEdit,
  handleOnChange,
  confirmDelete,
  inputRef,
}) => {
  return (
    <ul className="h-80 overflow-y-scroll overflow-x-hidden ">
      {!loading ? (
        <AnimatePresence initial={false}>
          {todos.length > 0 ? (
            todos.map((item) => (
              <MotionSlide key={item.id}>
                <li className="list-row text-xs px-4 items-center flex border-t border-base-200 rounded-none justify-between">
                  <div className="flex items-center gap-1.5 w-full">
                    {update.id !== item.id && (
                      <input
                        type="checkbox"
                        checked={item.complete}
                        className="checkbox checkbox-xs checkbox-neutral border-base-content/70"
                        onChange={(e) => handleCheck(e, item)}
                      />
                    )}
                    <form onSubmit={(e) => handleUpdate(e, update)}>
                      <input
                        // disabled={update.id !== item.id}
                        className={`focus:outline-0 w-full ${
                          item.complete ? "line-through" : ""
                        }`}
                        onChange={handleOnChange}
                        value={
                          update.id !== item.id ? item.title : update.title
                        }
                        ref={update.id === item.id ? inputRef : null}
                        onClick={() => handleEdit(item)}
                      />
                    </form>
                  </div>
                  <div className="flex gap-1">
                    <ButtonIcon
                      action={(e) =>
                        update.id !== item.id
                          ? handleEdit(item)
                          : handleUpdate(e, update)
                      }
                    >
                      <AiOutlineEdit className="text-sm" />
                    </ButtonIcon>
                    {update.id !== item.id && (
                      <ButtonIcon action={() => confirmDelete(item)}>
                        <LuTrash />
                      </ButtonIcon>
                    )}
                  </div>
                </li>
              </MotionSlide>
            ))
          ) : (
            <MotionUp>
              <li className="list-row h-full text-xs px-4 items-center justify-center flex border-t border-base-200 rounded-none">
                You don't have any todo
              </li>
            </MotionUp>
          )}
        </AnimatePresence>
      ) : (
        <li className="list-row h-full text-xs px-4 items-start justify-center flex border-t border-base-200 rounded-none">
          <div className="w-full space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-base-300"></div>
                <div className="flex-1 h-4 bg-base-300 rounded"></div>
                <div className="w-4 h-4 bg-base-300 rounded"></div>
                <div className="w-4 h-4 bg-base-300 rounded"></div>
              </div>
            ))}
          </div>
        </li>
      )}
    </ul>
  );
};

export default TodoList;
