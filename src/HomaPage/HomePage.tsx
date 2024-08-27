import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HomePage.css";
import { mockUp } from "../Data/MockUp";

export interface Product {
  id: number;
  type: string;
  name: string;
  price: number;
  image: string;
}

const HomePage = () => {
  const [listData] = useState<Product[]>(mockUp);
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
              {listData.map((item, index) => {
                return (
                  <div key={index} className="gird-game">
                    <div className="imagegame">
                      <img src={item.image} alt="logo" />
                    </div>
                    <div className="namegame">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="pricegame">
                      <h3>
                        {item.price <= 0
                          ? "Free"
                          : `${Intl.NumberFormat().format(item.price)} THB`}
                      </h3>
                    </div>
                    <div className="btn-buy">
                      <p>buy</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
