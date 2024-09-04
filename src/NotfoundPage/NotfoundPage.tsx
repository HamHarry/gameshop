import { useNavigate } from "react-router-dom";
import "./NotfoundPage.css";

function NotfoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container-notfound">
      <div className="warp-container-notfound">
        <div className="image-text">
          <h1>Oops!</h1>
        </div>
        <h3>
          404 - <span className="text-red">PAGE NOT FOUND</span>
        </h3>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotfoundPage;
