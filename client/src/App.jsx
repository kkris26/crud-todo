import { useEffect, useRef, useState } from "react";
import ButtonIcon from "./components/ButtonIcon";
import { LuTrash } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import ModalWarning from "./components/ModalWarning";

function App() {
  const [input, setInput] = useState({ title: "", complete: false });
  const [update, setUpdate] = useState({});
  const [todos, setTodos] = useState([]);
  const [udpateTodo, setUpdateTodo] = useState([]);
  const [toDelete, setToDelete] = useState({});
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const server = "http://localhost:8000/todos/";

  const getTodo = async () => {
    try {
      const response = await fetch(server);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    if (input.title === "") {
      return;
    }
    handleAdd(e);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(server, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      setTodos((prev) => [...prev, data]);
      setInput((prev) => ({ ...prev, title: "" }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e, updateItem) => {
    e.preventDefault();
    if (update.title == "") {
      return setUpdate({});
    }
    try {
      const response = await fetch(server + updateItem.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateItem),
      });
      const data = await response.json();
      setTodos((prev) =>
        prev.map((item) => (item.id === updateItem.id ? data : item))
      );
      setUpdate({});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    console.log(e.target.value);
    if (update.id) {
      return setUpdate((prev) => ({ ...prev, title: e.target.value }));
    }
    setInput((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleEdit = (item) => {
    setUpdate(item);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleCheck = (e, item) => {
    const isDone = { ...item, complete: !item.complete };
    handleUpdate(e, isDone);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(server + id, {
        method: "DELETE",
      });
      console.log("berhasil hapus", id);
      setTodos((prev) => prev.filter((item) => item.id !== id));
      // setInput((prev) => ({ ...prev, id: null }));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (item) => {
    modalRef.current?.showModal();
    setToDelete(item);
  };

  useEffect(() => {
    getTodo();
  }, []);
  console.log(update);
  console.log(inputRef);
  return (
    <>
      <ModalWarning
        setRef={modalRef}
        itemToDelete={toDelete}
        action={handleDelete}
      />
      <div className="flex flex-col gap-4 items-center w-full min-h-screen justify-center">
        <form onSubmit={handleSubmit}>
          <div className="join w-100">
            <input
              className="input w-full rounded-lg border-base-200 shadow join-item focus:outline-0 focus:border-gray-600"
              placeholder="Add Task"
              onChange={handleOnChange}
              value={input.title}
              required
            />
            <button className="btn join-item rounded-r-lg">
              {input.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
        <ul className="list bg-base-100 rounded-box shadow-md w-100 p-0 border border-base-200">
          <li className="p-4 text-xs opacity-60 tracking-wide">
            Your todo list
          </li>

          {todos.map((item, i) => (
            <li
              key={item.id}
              className="list-row text-xs px-4 items-center flex border-t border-base-200 rounded-none justify-between"
            >
              <div className="flex items-center gap-1 w-full">
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
                    disabled={update.id !== item.id}
                    className="focus:outline-0 w-full"
                    onChange={handleOnChange}
                    value={update.id !== item.id ? item.title : update.title}
                    ref={update.id === item.id ? inputRef : null}
                  />
                </form>
              </div>
              <div className="flex gap-1   ">
                <ButtonIcon
                  action={(e) =>
                    update.id !== item.id
                      ? handleEdit(item)
                      : handleUpdate(e, update)
                  }
                >
                  <AiOutlineEdit />
                </ButtonIcon>
                {update.id !== item.id && (
                  <ButtonIcon action={() => confirmDelete(item)}>
                    <LuTrash />
                  </ButtonIcon>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
