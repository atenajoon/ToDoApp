import { useState, useEffect } from "react";
import { fetchData } from "../api";
import Modal from "../Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [localList, setLocalList] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  // run after first render
  useEffect(() => {
    const _arr = localStorage.getItem("todoList");
    if (_arr) setLocalList(JSON.parse(_arr));
    console.log("localList: ", localList);
  }, []);

  useEffect(() => {
    // api call

    (async function func() {
      const data = await fetchData;
      setApiList(data);
    })();
    console.log("apiList: ", apiList);
  }, []);

  // run after every render
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(localList));
    console.log("apiList: ", apiList);
    console.log("localList: ", localList);
  }, [localList]);

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
      let _arr = [...localList];
      const editIndex = _arr.findIndex((item) => item.id === editId);
      _arr[editIndex].title = trimmedValue;
      setLocalList(_arr);
    } else {
      let newId =
        localList.length > 0 ? localList[localList.length - 1].id + 1 : 1;

      setLocalList((prevState) => [
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
    let _arr = [...localList];
    const deleteIndex = _arr.findIndex((item) => item.id === deleteId);

    _arr.splice(deleteIndex, 1);
    setLocalList(_arr);
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
      {localList.map(({ id, title }) => (
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
