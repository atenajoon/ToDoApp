import Button from "../Button";
import Backdrop from "./Backdrop";

const Modal = ({ showStatus, onCancel, onConfirm }) => {
  if (!showStatus) return false;
  return (
    <>
      <div className="modal">
        <p>Are you sure?</p>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} className="btn--alt">
          Confirm
        </Button>
      </div>
      <Backdrop />
    </>
  );
};

export default Modal;
