import { useState, useEffect } from "react";
import { fetchData, postNewItem } from "../api";
import Modal from "../Modal";
import ToDoCard from "./ToDoCard";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [newItem, setNewItem] = useState("");
  // const [apiList, setApiList] = useState([]);
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);

  // run after first render:

  useEffect(() => {
    // api call
    (async function getList() {
      const data = await fetchData;
      setArr(data);
      // setArr([]); // to empty the local storagefor testing
    })();
  }, []);

  // run after every render:

  useEffect(() => {
    console.log("arr:", arr);
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
      let todo = {
        title: trimmedValue,
        completed: false,
      };

      (async () => {
        fetch("https://jsonplaceholder.typicode.com/todos", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(todo),
        })
          .then((response) => response.json())
          .then((json) => {
            let _arr = [...arr, json];
            setArr(_arr);
          });

        // setArr([]); // to empty the local storagefor testing
      })();
    }
    setValue("");
    setEditId(null);
  };

  const handleModalShow = (id) => {
    setShow(!show);
    setDeleteId(id);
  };

  const handleDelete = () => {
    // let _arr = [...arr];
    // const deleteIndex = _arr.findIndex((item) => item.id === deleteId);

    // _arr.splice(deleteIndex, 1);
    // setLocalList(_arr);
    // setShow(!show);

    console.log("deleted ", deleteId);
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
