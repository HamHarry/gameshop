import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HomePage.css";
import { mockUp } from "../Data/MockUp";

const HomePage = () => {
  const [listData, setListData] = useState(mockUp);
  return (
    <div className="container-hompage">
      <Navbar />
      <div className="warp-container-homepage">
        <div className="header">
          <h1>Welcome to Game Store</h1>
        </div>
        <div className="container-table">
          <div className="table-game">
            <div className="table">
              <div className="gird-game">
                <div className="imagegame">
                  <img src="/public/assets/gta-v-main.jpg" alt="logo" />
                </div>
                <div className="namegame">
                  <h3>Grand Theft Auto V</h3>
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
    </div>
  );
};

export default HomePage;
