import { useEffect, useState } from "react";
const useGetTodos = (server, errorRef) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTodo = async () => {
    try {
      const response = await fetch(server);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      errorRef.current.showModal();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  return { todos, loading, setTodos };
};

export default useGetTodos;
