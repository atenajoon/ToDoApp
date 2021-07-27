import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const refId = useRef(0);
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
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

  const handleEditClick = (value, id) => {
    setValue(value);
    setEditId(id);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = () => {
    let trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    if (editId) {
      let _arr = [...arr];
      const editIndex = _arr.findIndex((item) => item.id === editId);
      _arr[editIndex].value = trimmedValue;
      setArr(_arr);
    } else {
      refId.current++;
      setArr((prevState) => [
        ...prevState,
        {
          id: refId.current,
          value: trimmedValue,
        },
      ]);
    }
    setValue("");
    setEditId(null);
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
      {arr.map(({ id, value }, index) => (
        <ToDoCard
          key={index}
          item={value}
          onDelete={() => handleModalShow(index)}
          onEdit={() => handleEditClick(value, id)}
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
