import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./PaymentPage.css";
import "./DialogCard.css";
import "./DialogQR.css";

const PaymentPage = () => {
  const [openDialogCard, setOpenDialogCard] = useState<boolean>(false);
  const [openDialogQR, setOpenDialogQR] = useState<boolean>(false);

  //render =================================================================
  const renderDialogCard = () => {
    return (
      <dialog open={openDialogCard}>
        <div className="container-card">
          <div className="container-card-nav">
            <div className="container-card-text">
              <h1>Debit Card</h1>
            </div>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialogCard(!openDialogCard);
              }}
            ></i>
          </div>
          <div className="warp-card"></div>
          <div className="btn-celect">
            <button>Celect</button>
          </div>
        </div>
      </dialog>
    );
  };
  const renderDialogQR = () => {
    return (
      <dialog open={openDialogQR}>
        <div className="container-qr">
          <div className="container-qr-nav">
            <div className="container-qr-text">
              <h1>QR Code</h1>
            </div>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialogQR(!openDialogQR);
              }}
            ></i>
          </div>
          <div className="warp-container-qr">
            <img src="/public/assets/qr-code.png" alt="logo" />
          </div>
          <div className="btn-complete">
            <button>Complete</button>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <div className="container-payment">
      <Navbar />
      <div className="warp-container-payment">
        <div className="payment-text">
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="listCart-container"></div>
        <div className="btn-payments">
          <button>Cash</button>
          <button
            onClick={() => {
              setOpenDialogCard(!openDialogCard);
            }}
          >
            Debit Card
          </button>
          <button
            onClick={() => {
              setOpenDialogQR(!openDialogQR);
            }}
          >
            QR Code
          </button>
        </div>
      </div>
      {renderDialogCard()}
      {renderDialogQR()}
    </div>
  );
};

export default PaymentPage;
