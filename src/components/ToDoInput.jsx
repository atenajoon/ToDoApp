import Button from "./Button";

const ToDoInput = ({ value, onChange, onAdd }) => {
  return (
    <div>
      <input value={value} onChange={onChange} />
      <Button className="btn--green" onClick={onAdd}>
        Add
      </Button>
    </div>
  );
};

export default ToDoInput;
