import "./404css.scss";
import { useNavigate } from "react-router-dom";
function Page404() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <>
      <h1>404 Error Page</h1>
      <p className="zoom-area">
        <b>Page Not Found</b>
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <p
          onClick={onClick}
          className="more-link"
          style={{ cursor: "pointer" }}
        >
          Back to home
        </p>
      </div>
    </>
  );
}

export default Page404;
