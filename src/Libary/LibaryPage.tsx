/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { gameLibarySelector } from "../store/slices/gameSlice";
import "./LibaryPage.css";

const libaryPage = () => {
  const gameLibary = useSelector(gameLibarySelector);
  return (
    <div className="warp-container-libary">
      <div className="nav-libary">
        <h1>Libary</h1>
      </div>
      <div className="nav-left-list-game">
        <div className="nav-list-game">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="list-game">
        {gameLibary.map((item, index) => {
          return (
            <div key={index} className="warp-list-game">
              <img src={item.image} alt="" />
              <div className="list-game-text">
                <h1>{item.name}</h1>
                <p>Type: {item.type}</p>
              </div>
              <button className="btn-pay">Play</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default libaryPage;
