const Button = ({ onClick, children, className = "" }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
