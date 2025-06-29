import { useEffect, useRef, useState } from "react";
import ModalWarning from "./components/ModalWarning";
import ThemeToggle from "./components/ThemeToggle";
import Accordion from "./components/Accordion";
import TodoList from "./components/TodoList";
import InputForm from "./components/InputForm";

function App() {
  const [input, setInput] = useState({ title: "", complete: false });
  const [update, setUpdate] = useState({});
  const [todos, setTodos] = useState([]);
  const [toDelete, setToDelete] = useState({});
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  const handleSubmit = async (e) => {
    if (input.title === "") {
      return;
    }
    handleAdd(e);
    setOpen(true);
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
  console.log(update, "update");
  console.log(input, "input");

  return (
    <>
      <ModalWarning
        setRef={modalRef}
        itemToDelete={toDelete}
        action={handleDelete}
      />
      <div className="flex flex-col gap-2 items-center w-150 mx-auto min-h-screen justify-center">
          <li className="px-1 w-full py-1 rounded-t-md text-xs tracking-wide flex justify-between">
            <p>Your todo list</p>
            <p>
              {todos.filter((item) => item.complete).length}/{todos.length}
            </p>
          </li>
        <div className="list bg-base-100 rounded-md shadow-sm w-full p-0 border border-base-200">
          <InputForm
            submit={handleSubmit}
            change={handleOnChange}
            input={input}
          />

          <div className="join join-vertical bg-base-100 rounded-md">
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
                handleOnChange={handleOnChange}
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
                handleOnChange={handleOnChange}
                confirmDelete={confirmDelete}
                inputRef={inputRef}
              />
            </Accordion>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </>
  );
}

export default App;
