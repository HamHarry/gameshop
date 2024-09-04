/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./HomePage.css";
import { mockUp } from "../Data/MockUp";
import "./DialogPromotion.css";
import "./DialogGame.css";

interface GameItem {
  type: string;
  name: string;
  price: number;
  image: string;
  imageShow: ImageShow[];
}

interface ImageShow {
  image: string;
}

const HomePage = () => {
  const [openPromotion, setOpenPromotion] = useState<boolean>(true);
  const [openDialogGame, setOpenDialogGame] = useState<boolean>(false);
  const [dataGame, setDataGame] = useState<GameItem>();
  const [listData, setListData] = useState(mockUp);
  const [listDataRef] = useState(listData);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [slide, setSlide] = useState(0);

  //reset ===================================================================
  const reset = () => {
    setListData(listDataRef);
    setSelectedType("all");
    setSearchValue("");
  };

  //handle ===================================================================
  const handleonChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const newlist = listDataRef.filter((item) => {
      const valueName = item.name.toLowerCase().includes(value);
      const valueType = item.type === selectedType || selectedType === "all";
      return valueName && valueType;
    });
    setListData(newlist);
    setSearchValue(value);
  };

  // render =================================================================
  const renderPromotion = () => {
    const gamePromote = listData.find((item) => {
      return item.name === "Black Myth: Wukong";
    });

    // เปลี่ยนรูปภาพ =============================================================
    const leftSlide = () => {
      const number =
        slide === 0 ? (gamePromote?.imageShow.length as any) - 1 : slide - 1;
      setSlide(number);
    };
    const rightSlide = () => {
      const number =
        slide === (gamePromote?.imageShow.length as any) - 1 ? 0 : slide + 1;
      setSlide(number);
    };

    return (
      <dialog open={openPromotion}>
        <div className="dialogPromotion-container">
          <div className="nav-dialogPromotion">
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenPromotion(!openPromotion);
              }}
            ></i>
          </div>
          <div className="warp-dialogPromotion">
            {gamePromote && (
              <>
                <h1>
                  New Game <span className="text-red">{gamePromote?.name}</span>
                </h1>
                <div className="warp-image">
                  <div className="animation">
                    {gamePromote?.imageShow.map((item, index) => {
                      return (
                        <img
                          src={item.image}
                          alt="logo"
                          key={index}
                          className={
                            slide === index ? "slider" : "sliedr-hidden"
                          }
                        />
                      );
                    })}
                  </div>
                  <span className="indicators">
                    {gamePromote?.imageShow.map((_, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            slide === index ? "indicator" : "indicator-hidden"
                          }
                          onClick={() => {
                            setSlide(index);
                          }}
                        />
                      );
                    })}
                  </span>
                  <i
                    className="fa-solid fa-circle-left"
                    onClick={leftSlide}
                  ></i>
                  <i
                    className="fa-solid fa-circle-right"
                    onClick={rightSlide}
                  ></i>
                </div>
                <div
                  className="btn-promotion"
                  onClick={() => {
                    return console.log(gamePromote);
                  }}
                >
                  <h2>Buy</h2>
                </div>
              </>
            )}
          </div>
        </div>
      </dialog>
    );
  };
  const renderDialogGame = () => {
    const game = dataGame;

    // เปลี่ยนรูปภาพ =============================================================
    const leftSlide = () => {
      const number =
        slide === 0 ? (game?.imageShow.length as any) - 1 : slide - 1;
      setSlide(number);
    };
    const rightSlide = () => {
      const number =
        slide === (game?.imageShow.length as any) - 1 ? 0 : slide + 1;
      setSlide(number);
    };

    return (
      <dialog open={openDialogGame}>
        {game && (
          <div className="dialogGame-container">
            <div className="dialogGame-nav">
              <h1>{game.name}</h1>
              <i
                className="fa-solid fa-circle-xmark"
                onClick={() => {
                  setOpenDialogGame(!openDialogGame);
                  setSlide(0);
                }}
              ></i>
            </div>
            <div className="warp-image-game">
              <div className="animation">
                {game.imageShow.map((item, index) => {
                  return (
                    <img
                      src={item.image}
                      alt="logo"
                      key={index}
                      className={slide === index ? "slider" : "sliedr-hidden"}
                    />
                  );
                })}
              </div>
              <span className="indicators-game">
                {game.imageShow.map((_, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        slide === index ? "indicator" : "indicator-hidden"
                      }
                      onClick={() => {
                        setSlide(index);
                      }}
                    />
                  );
                })}
              </span>
              <div className="btn-left-right">
                <i className="fa-solid fa-circle-left" onClick={leftSlide}></i>
                <i
                  className="fa-solid fa-circle-right"
                  onClick={rightSlide}
                ></i>
              </div>
            </div>
            <div className="price">
              <h2>
                {game.price <= 0
                  ? "Free"
                  : `${Intl.NumberFormat().format(game.price)} THB`}
              </h2>
            </div>
            <div className="btn-dialogGame">
              <button className="btn-add-game">Add to Cart</button>
              <button className="btn-buy-game">Buy</button>
            </div>
          </div>
        )}
      </dialog>
    );
  };
  const renderChoises = () => {
    return (
      <div className="choise">
        <button
          className={
            selectedType === "open world"
              ? "is-choise-open-world"
              : "choise-open-world"
          }
          onClick={() => {
            const newlist = listDataRef.filter((item) => {
              const statusType = item.type === "open world";
              const valueName = item.name.toLowerCase().includes(searchValue);
              return statusType && valueName;
            });
            setListData(newlist);
            setSelectedType("open world");
          }}
        >
          Open World
        </button>
        <button
          className={selectedType === "fps" ? "is-choise-fps" : "choise-fps"}
          onClick={() => {
            const newlist = listDataRef.filter((item) => {
              const statusType = item.type === "fps";
              const valueName = item.name.toLowerCase().includes(searchValue);
              return statusType && valueName;
            });
            setListData(newlist);
            setSelectedType("fps");
          }}
        >
          FPS
        </button>
        <button
          className={
            selectedType === "survive" ? "is-choise-survive" : "choise-survive"
          }
          onClick={() => {
            const newlist = listDataRef.filter((item) => {
              const statusType = item.type === "survive";
              const valueName = item.name.toLowerCase().includes(searchValue);
              return statusType && valueName;
            });
            setListData(newlist);
            setSelectedType("survive");
          }}
        >
          Survival
        </button>
        <button
          className={selectedType === "moba" ? "is-choise-moba" : "choise-moba"}
          onClick={() => {
            const newlist = listDataRef.filter((item) => {
              const statusType = item.type === "moba";
              const valueName = item.name.toLowerCase().includes(searchValue);
              return statusType && valueName;
            });
            setListData(newlist);
            setSelectedType("moba");
          }}
        >
          Moba
        </button>
      </div>
    );
  };

  return (
    <div className="container-hompage">
      <div className="warp-container-homepage">
        <div className="header">
          <h1>Welcome to Game Store</h1>
        </div>
        <div className="container-table">
          <div className="table-nav">
            {renderChoises()}
            <div className="table-nav-search">
              <input
                value={searchValue}
                type="text"
                placeholder="Search...."
                onChange={handleonChangeSearch}
              />
              <i
                className="fa-solid fa-arrow-rotate-left"
                onClick={() => {
                  reset();
                }}
              ></i>
            </div>
          </div>
          <div className="table-game">
            <div className="table">
              {listData.map((item, index) => {
                return (
                  <div key={index} className="gird-game">
                    <div className="imagegame">
                      <img
                        src={item.image}
                        alt="logo"
                        onClick={() => {
                          setDataGame(item);
                          setOpenDialogGame(!openDialogGame);
                        }}
                      />
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
            {renderPromotion()}
            {renderDialogGame()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
