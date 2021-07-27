import { useState, useEffect } from "react";
import Modal from "./Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // run after first render
  useEffect(() => {
    const _arr = localStorage.getItem("todoList");
    if (_arr) setArr(JSON.parse(_arr));
  }, []);

  // run after every render
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(arr));
  }, [arr]);

  const handleEditClick = (value) => {
    console.log(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = () => {
    if (!value.trim()) {
      return;
    }
    setArr([...arr, value.trim()]);
    setValue("");
  };

  const handleModalShow = (index) => {
    setShow(!show);
    setDeleteIndex(index);
  };

  const handleDelete = () => {
    let newArr = [...arr];
    newArr.splice(deleteIndex, 1);
    setArr(newArr);
    setShow(!show);
  };

  return (
    <div>
      <ToDoInput value={value} onChange={handleChange} onAdd={handleAdd} />
      {arr.map((value, index) => (
        <ToDoCard
          key={index}
          item={value}
          onDelete={() => handleModalShow(index)}
          onEdit={() => handleEditClick(value)}
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
