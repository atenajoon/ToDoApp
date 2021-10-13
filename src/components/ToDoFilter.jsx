import Button from "./Button";

const ToDoFilter = ({ doFilter, onFilter }) => {
  return (
    <div>
      <Button className="btn--alt" onClick={onFilter}>
        {doFilter ? "Completed" : "All"}
      </Button>
      <p>{doFilter ? "All Tasks:" : "Completed Tasks:"}</p>
    </div>
  );
};

export default ToDoFilter;
