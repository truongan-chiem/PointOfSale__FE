import PropTypes from "prop-types";
import "./SelectOption.scss";
const SelectOption = ({ title, listOption, options, setOptions }) => {
  // const activeColor = title !== "mood" && title !== "size";
  const activeColor = true;
  return (
    <div className="select-option">
      <h2 className="select-option__title">{title}</h2>
      <div className="select-option__body">
        {listOption.map((item, index) => (
          <button
            key={index}
            onClick={() => setOptions((prev) => ({ ...prev, [title]: item.value }))}
            className={`select-option__body__btn ${item.value === options[title] ? "active" : ""} ${
              activeColor ? "percent" : ""
            } `}
          >
            {item.display}
          </button>
        ))}
      </div>
    </div>
  );
};
SelectOption.propTypes = {
  title: PropTypes.string.isRequired,
  listOption: PropTypes.array,
  options: PropTypes.object,
  setOptions: PropTypes.func,
};

export default SelectOption;
