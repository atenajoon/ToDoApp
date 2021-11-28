import Button from "../common/Button";

const TaskCard = ({ item, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h2>{item}</h2>
      <div className="actions">
        <Button className="btn--yellow" onClick={onEdit}>
          Edit
        </Button>
      </div>
      <div className="actions">
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default TaskCard;
