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
  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  // localStorage.setItem("todoList", JSON.stringify(arr));

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
      {arr.map((item, index) => (
        <ToDoCard
          key={index}
          item={item}
          onDelete={() => handleModalShow(index)}
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
