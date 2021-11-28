import Button from "./common/Button";

const ToDoInput = ({ value, onChange, onAdd, editId }) => {
  return (
    <div>
      <input value={value} onChange={onChange} />
      <Button className="btn--green" onClick={onAdd}>
        {editId ? "Update" : "Add"}
      </Button>
    </div>
  );
};

export default ToDoInput;
