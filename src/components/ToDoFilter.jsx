import Button from "./common/Button";

const ToDoFilter = ({ doFilter, onFilter }) => {
  return (
    <div>
      <Button className="btn--alt" onClick={onFilter}>
        {doFilter ? "Show Completed" : "Show All"}
      </Button>
      <p>{doFilter ? "All Tasks:" : "Completed Tasks:"}</p>
    </div>
  );
};

export default ToDoFilter;
