/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import {
  clearOutGame,
  gameLibarySelector,
  setOutsideGame,
} from "../store/slices/gameSlice";
import "./LibaryPage.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { GameItem } from "../HomaPage/HomePage";
import "./DialogAddGame.css";

const defaultValues: GameItem = {
  type: "",
  name: "",
  price: 0,
  image: "/public/assets/file.png",
  imageShow: [],
  mode: "out",
};

const libaryPage = () => {
  const [openDialogAddGame, setOpenDialogAddGame] = useState<boolean>(false);
  const gameLibary = useSelector(gameLibarySelector);
  const dispatch = useDispatch();
  const { handleSubmit, control, watch } = useForm<GameItem>({
    defaultValues,
  });

  const submit = (value: GameItem) => {
    const item = {
      ...value,
    };
    console.log(item);
    dispatch(setOutsideGame(item));
    setOpenDialogAddGame(!openDialogAddGame);
  };

  const renderDialogAddGame = () => {
    return (
      <dialog open={openDialogAddGame}>
        <div className="container-dialogAddGame">
          <div className="nav-dialogAddGame">
            <h1>AddGame</h1>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialogAddGame(!openDialogAddGame);
              }}
            ></i>
          </div>
          <div className="warp-dialogAddGame">
            <form onSubmit={handleSubmit(submit)}>
              <img src={watch("image")} alt="" />
              <div className="formAddGame">
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        type="text"
                        placeholder="Image link:...."
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <input {...field} type="text" placeholder="Name:..." />
                    );
                  }}
                />
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <div className="warp-container-libary">
      <div className="nav-libary">
        <h1>Libary</h1>
      </div>
      <div className="nav-left-list-game">
        <div
          className="nav-list-game"
          onClick={() => {
            setOpenDialogAddGame(!openDialogAddGame);
          }}
        >
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
              <div className="btn-all">
                <button className="btn-pay">Play</button>
                <button
                  className={
                    item.mode === "out" ? "is-btn-delete" : "btn-delete"
                  }
                  onClick={() => {
                    dispatch(clearOutGame(item));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {renderDialogAddGame()}
    </div>
  );
};

export default libaryPage;
