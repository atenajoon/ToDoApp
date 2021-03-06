import { useState, useEffect, useCallback } from "react";
import {
  getData,
  postData,
  updateData,
  deleteData,
  filterData,
} from "../../api";
import Modal from "../common/Modal";
import Spinner from "../Spinner";
import TaskCard from "../TaskCard";
import FilterTasks from "../FilterTasks";
import AddATask from "../AddATask";

const Main = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [show, setShow] = useState(false);
  const [doFilter, setDoFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [spiner, setSpiner] = useState(false);

  useEffect(() => {
    console.log("arr:", arr);
  }, [arr]);

  // async-await method:
  const setList = useCallback(async () => {
    const data = await getData();
    setArr(data);
  }, []);

  useEffect(() => {
    setList();
  }, [setList]);

  // functions:
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAdd = async () => {
    let trimmedValue = value.trim();
    if (!trimmedValue) return;

    setSpiner(true);
    if (editId) {
      // edit an existing item
      const res = await updateData(editId, trimmedValue);
      let _arr = [...arr];
      const editIndex = _arr.findIndex((item) => item.id === editId);
      _arr[editIndex].title = res.title;

      setSpiner(false);
      setArr(_arr);
    } else {
      // add a new item
      let todo = {
        title: trimmedValue,
        completed: false,
      };

      const res = await postData(todo);
      let _arr = [...arr, res];

      setSpiner(false);
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
    setSpiner(true);
    // simulate deleting from database
    const res = await deleteData(deleteId);
    if (res.ok) {
      let _arr = [...arr];
      const deleteIndex = _arr.findIndex((item) => item.id === deleteId);
      _arr.splice(deleteIndex, 1);

      setShow(!show);
      setSpiner(false);
      console.log("arr", _arr);
      setArr(_arr);
    }
  };

  const handleFilter = async () => {
    setDoFilter(!doFilter);
    setIsLoading(true);

    if (doFilter) {
      const res = await filterData();
      setIsLoading(false);
      setArr(res);
    } else {
      (async () => {
        setIsLoading(false);
        setList();
      })();
    }
  };

  return (
    <div>
      <div className="content">
        {spiner ? <i className="fa fa-spinner fa-spin">spiner...!</i> : null}
        <AddATask
          value={value}
          onChange={handleChange}
          onAdd={handleAdd}
          editId={editId}
          npm
        />

        <FilterTasks doFilter={doFilter} onFilter={handleFilter} />
      </div>

      {isLoading ? (
        <Spinner className="content" isLoading={isLoading} />
      ) : (
        <div className="cardContainer">
          {[...arr].reverse().map(({ id, title }) => (
            <TaskCard
              key={id}
              id={id}
              item={title}
              onEdit={() => handleEditClick(title, id)}
              onDelete={() => handleModalShow(id)}
            />
          ))}
        </div>
      )}

      <Modal
        showStatus={show}
        onCancel={handleModalShow}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Main;
