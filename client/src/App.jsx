import { useEffect, useRef, useState } from "react";
import ModalWarning from "./components/ModalWarning";
import ThemeToggle from "./components/ThemeToggle";
import Accordion from "./components/Accordion";
import TodoList from "./components/TodoList";
import InputForm from "./components/InputForm";
import useGetTodos from "./hooks/useGetTodos";
import ErrorModal from "./components/ErrorModal";
import { Slide, ToastContainer, toast } from "react-toastify";

function App() {
  const [input, setInput] = useState({ title: "", complete: false });
  const [update, setUpdate] = useState({});
  const [toDelete, setToDelete] = useState({});
  const [open, setOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const modalRef = useRef(null);
  const errorRef = useRef(null);
  const inputRef = useRef(null);
  const server = "http://localhost:8000/todos/";
  const { todos, loading, setTodos } = useGetTodos(server, errorRef);

  const handleError = () => {
    errorRef.current.showModal();
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
      setOpen(true);
      addTodo();
      console.log(data);
    } catch (error) {
      handleError();
    }
  };
  const handleUpdate = async (e, updateItem) => {
    e.preventDefault();
    if (update.title === "" || update.title === updateItem.title) {
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
      if (update.id) {
        updateTodo();
      }
      setUpdate({});
      console.log(data);
    } catch (error) {
      handleError();
    }
  };
  const handleOnChange = (e) => {
    if (update.id) {
      handleUpdate(e, update);
    }
    return setInput((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleOnChangeUpdate = (e) => {
    return setUpdate((prev) => ({ ...prev, title: e.target.value }));
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
      setTodos((prev) => prev.filter((item) => item.id !== id));
      deleteTodo();
    } catch (error) {
      handleError();
    }
  };

  const confirmDelete = (item) => {
    modalRef.current?.showModal();
    setToDelete(item);
  };

  const addTodo = () => toast.success("Todo added");
  const deleteTodo = () => toast.success("Todo deleted");
  const updateTodo = () => toast.success("Todo updated");
  console.log(isDark);
  return (
    <div>
      <ModalWarning
        setRef={modalRef}
        itemToDelete={toDelete}
        action={handleDelete}
      />
      <ErrorModal ref={errorRef} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        transition={Slide}
      />
      <div className="flex  flex-col gap-2 px-4 md:px-0 items-center w-full md:w-120 mx-auto min-h-screen justify-center">
        <li className="px-1 w-full py-1 rounded-t-md text-xs tracking-wide flex justify-between">
          <p>Your todo list</p>
          <p>
            {todos.filter((item) => item.complete).length}/{todos.length}
          </p>
        </li>
        <div className="list  rounded-md shadow-sm w-full p-0 border border-base-200 ">
          <InputForm submit={handleAdd} change={handleOnChange} input={input} />

          <div className="join  join-vertical bg-base-100 rounded-md">
            <Accordion
              heading="To do"
              open={open}
              action={() => setOpen(!open)}
              def={true}
            >
              <TodoList
                todos={todos.filter((item) => !item.complete)}
                loading={loading}
                update={update}
                handleCheck={handleCheck}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleOnChangeUpdate={handleOnChangeUpdate}
                confirmDelete={confirmDelete}
                inputRef={inputRef}
              />
            </Accordion>
            <Accordion
              heading="Complete"
              open={!open}
              action={() => setOpen(!open)}
            >
              <TodoList
                todos={todos.filter((item) => item.complete)}
                loading={loading}
                update={update}
                handleCheck={handleCheck}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleOnChangeUpdate={handleOnChangeUpdate}
                confirmDelete={confirmDelete}
                inputRef={inputRef}
                type={"complete"}
              />
            </Accordion>
          </div>
        </div>

        <ThemeToggle setDark={setIsDark} />
      </div>
    </div>
  );
}

export default App;
