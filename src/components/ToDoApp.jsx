import { useState, useEffect } from "react";
import { fetchData } from "../api";
import Modal from "../Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [apiArr, setApiArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  // run after first render
  useEffect(() => {
    const _arr = localStorage.getItem("todoList");
    if (_arr) setArr(JSON.parse(_arr));
    console.log("arr: ", arr);
  }, []);

  useEffect(() => {
    // api call

    (async function func() {
      const data = await fetchData;
      setApiArr(data);
    })();
    console.log("apiArr: ", apiArr);
  }, []);

  // run after every render
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(arr));
    console.log("apiArr: ", apiArr);
    console.log("arr: ", arr);
  }, [arr]);

  const handleEditClick = (title, id) => {
    setValue(title);
    setEditId(id);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = () => {
    let trimmedValue = value.trim();
    if (!trimmedValue) return;

    if (editId) {
      let _arr = [...arr];
      const editIndex = _arr.findIndex((item) => item.id === editId);
      _arr[editIndex].title = trimmedValue;
      setArr(_arr);
    } else {
      let newId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;

      setArr((prevState) => [
        ...prevState,
        {
          id: newId,
          title: trimmedValue,
        },
      ]);
    }
    setValue("");
    setEditId(null);
  };

  const handleModalShow = (id) => {
    setShow(!show);
    setDeleteId(id);
  };

  const handleDelete = () => {
    let _arr = [...arr];
    const deleteIndex = _arr.findIndex((item) => item.id === deleteId);

    _arr.splice(deleteIndex, 1);
    setArr(_arr);
    setShow(!show);
  };

  return (
    <div>
      <ToDoInput
        value={value}
        onChange={handleChange}
        onAdd={handleAdd}
        editId={editId}
      />
      {arr.map(({ id, title }) => (
        <ToDoCard
          key={id}
          id={id}
          item={title}
          onEdit={() => handleEditClick(title, id)}
          onDelete={() => handleModalShow(id)}
        />
      ))}
      <Modal
        showStatus={show}
        onCancel={handleModalShow}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ToDoApp;
