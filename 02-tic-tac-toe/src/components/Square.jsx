import PropTypes from "prop-types";


const Square = ({ children, isSelected, updateBoard, index }) => {

  //className is a string that will be used as a class name for the square
  const className = `square ${isSelected ? "is-selected" : ""}`;

  // handleClick is a function that will be called when the square is clicked, it will call the updateBoard function with the index of the square
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.string,
  isSelected: PropTypes.bool,
  updateBoard: PropTypes.func,
  index: PropTypes.number,
};

export default Square;