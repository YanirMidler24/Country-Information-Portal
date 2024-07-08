import { Link } from "react-router-dom";
import "./NoMatch.css";
const NoMatch = () => {
  return (
    <div className="nomatch">
      <h1>404</h1>
      <h2>מצטערים</h2>
      <p>הדף שחיפשת לא קיים</p>
      <Link to="/">בחזרה לדף הראשי</Link>
    </div>
  );
};

export default NoMatch;
