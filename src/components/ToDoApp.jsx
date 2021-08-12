import { useState, useEffect } from "react";
import Modal from "../Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  // run after first render
  useEffect(() => {
    const _arr = localStorage.getItem("todoList");
    if (_arr) setArr(JSON.parse(_arr));
  }, []);

  // run after every render
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(arr));
  }, [arr]);

  const handleEditClick = (title, id) => {
    setValue(title);
    setEditId(id);
    console.log("editId: ", editId);
    console.log("title: ", title);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = () => {
    let trimmedValue = value.trim();
    if (!trimmedValue) return;

    console.log(editId);
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
      console.log("added-arr:", arr);
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
