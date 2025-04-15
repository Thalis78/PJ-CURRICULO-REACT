import "./styles.css";
import spinnerImage from "../../../public/img/spinner.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinnerImage} alt="loading" />
    </div>
  );
};

export { Spinner };
