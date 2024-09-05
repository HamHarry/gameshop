import "./LibalyPage.css";

const LibalyPage = () => {
  return (
    <div className="container-libaly">
      <div className="warp-container-libaly">
        <div className="nav-libaly">
          <h1>Libaly</h1>
        </div>
        <div className="nav-left-list-game">
          <div className="nav-list-game">
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className="list-game"></div>
      </div>
    </div>
  );
};

export default LibalyPage;
