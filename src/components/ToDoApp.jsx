import { useState, useEffect } from "react";
import { getData, postData, updateData, deleteData, filterData } from "../api";
import Modal from "../Modal";
import LoadingIndicator from "./LoadingIndicator";
import ToDoCard from "./ToDoCard";
import ToDoFilter from "./ToDoFilter";
import ToDoInput from "./ToDoInput";

const ToDoApp = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);
  const [doFilter, setDoFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // fetch-then method:
  // useEffect(() => {
  //   (async function getList() {
  //     const data = await getData;
  //     setArr(data);
  //   })();
  // }, []);

  // async-await method:
  useEffect(async () => {
    const data = await getData();
    setArr(data);
  }, []);

  useEffect(() => {
    console.log("arr:", arr);
  }, [arr]);

  //  functions:
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = async () => {
    let trimmedValue = value.trim();
    if (!trimmedValue) return;

    setIsLoading(true);
    if (editId) {
      // edit an existing item
      const res = await updateData(editId, trimmedValue);
      let _arr = [...arr];
      const editIndex = _arr.findIndex((item) => item.id === editId);
      _arr[editIndex].title = res.title;

      setIsLoading(false);
      setArr(_arr);
    } else {
      // add a new item
      let todo = {
        title: trimmedValue,
        completed: false,
      };

      const res = await postData(todo);
      let _arr = [...arr, res];

      setIsLoading(false);
      setArr(_arr);
    }
    setValue("");
    setEditId(null);
  };

  const handleEditClick = (title, id) => {
    setValue(title);
    setEditId(id);
  };

  const handleModalShow = (id) => {
    setShow(!show);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const res = await deleteData(deleteId);
    // if(res.showStatus.ok){
    let _arr = [...arr];
    const deleteIndex = _arr.findIndex((item) => item.id === deleteId);
    _arr.splice(deleteIndex, 1);
    setArr(_arr);
    setShow(!show);
    // }
  };

  const handleFilter = async () => {
    setDoFilter(!doFilter);

    if (doFilter) {
      const res = await filterData();
      setArr(res);
    } else {
      (async () => {
        const data = await getData();
        setArr(data);
      })();
    }
  };

  return (
    <div>
      <ToDoInput
        value={value}
        onChange={handleChange}
        onAdd={handleAdd}
        editId={editId}
      />
      <ToDoFilter doFilter={doFilter} onFilter={handleFilter} />
      <LoadingIndicator isLoading={isLoading} />
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
