import { AnimatePresence } from "motion/react";
import { MotionSlide, MotionUp } from "./MotionInOut";
import ButtonIcon from "./ButtonIcon";
import { AiOutlineEdit } from "react-icons/ai";
import { LuTrash } from "react-icons/lu";
import HoverInfo from "./HoverInfo";

const TodoList = ({
  todos,
  loading,
  update,
  handleCheck,
  handleUpdate,
  handleEdit,
  handleOnChangeUpdate,
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
                <div className="flex flex-col gap-0">
                  <li className="list-row text-xs px-4 py-3 items-center flex border-b border-base-200/60 rounded-none justify-between">
                    <div className="flex items-center gap-1.5 w-full">
                      {update.id !== item.id && (
                        <input
                          type="checkbox"
                          checked={item.complete}
                          className="checkbox checkbox-xs checkbox-neutral border-base-content/70"
                          onChange={(e) => handleCheck(e, item)}
                        />
                      )}
                      <form
                        onSubmit={(e) => handleUpdate(e, update)}
                        className="w-full"
                      >
                        <input
                          onChange={(e) => handleOnChangeUpdate(e)}
                          className={`focus:outline-0 w-full ${
                            item.complete ? "line-through" : ""
                          }`}
                          value={
                            update.id !== item.id ? item.title : update.title
                          }
                          ref={update.id === item.id ? inputRef : null}
                          onClick={() => handleEdit(item)}
                          readOnly={update.id !== item.id}
                        />
                      </form>
                    </div>
                    <div className="flex gap-1 items-center">
                      <ButtonIcon
                        action={(e) =>
                          update.id !== item.id
                            ? handleEdit(item)
                            : handleUpdate(e, update)
                        }
                      >
                        <HoverInfo>Edit</HoverInfo>
                        <AiOutlineEdit className="text-sm" />
                      </ButtonIcon>
                      {update.id !== item.id && (
                        <ButtonIcon action={() => confirmDelete(item)}>
                          <HoverInfo>Delete</HoverInfo>
                          <LuTrash />
                        </ButtonIcon>
                      )}
                    </div>
                  </li>
                  {/* <div className="divider divider-base-200 w-full m-0"></div> */}
                </div>
              </MotionSlide>
            ))
          ) : (
            <MotionUp>
              <li className="list-row mt-4 text-xs px-4 items-center justify-center flex rounded-none">
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
