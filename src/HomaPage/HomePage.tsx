import Navbar from "../Navbar/Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container-hompage">
      <Navbar />
      <div className="warp-container-homepage">
        <div className="header">
          <h1>Welcome Game Shop</h1>
        </div>
        <div className="container-table">
          <div className="table-game">
            <div className="gird-table">
              <div className="imagegame">
                <img src="" alt="" />
              </div>
              <div className="namegame">
                <h3>GTA</h3>
              </div>
              <div className="pricegame">
                <h3>25 $</h3>
              </div>
              <div className="btn-buy">
                <p>buy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
