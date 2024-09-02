import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./PaymentPage.css";
import "./DialogCard.css";
import "./DialogQR.css";
import "./Card.css";
import { Controller, useForm } from "react-hook-form";

interface Card {
  number1: string;
  number2: string;
  number3: string;
  number4: string;
  fname: string;
  lname: string;
  date: string;
  ccv: string;
}

const defaultValues: Card = {
  number1: "",
  number2: "",
  number3: "",
  number4: "",
  fname: "",
  lname: "",
  date: "",
  ccv: "",
};

const PaymentPage = () => {
  const [openDialogCard, setOpenDialogCard] = useState<boolean>(false);
  const [openDialogQR, setOpenDialogQR] = useState<boolean>(false);
  const [cardForm, setCardForm] = useState<Card>();

  const { handleSubmit, control } = useForm<Card>({ defaultValues });

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
          <div className="warp-card">
            <div className="card">
              <div className="card-inner">
                <div className="front">
                  <img
                    className="map-img"
                    src="https://i.ibb.co/PYss3yv/map.png"
                  />
                  <div className="row">
                    {/* width 60px */}
                    <img src="https://i.ibb.co/G9pDnYJ/chip.png" />
                    <img src="https://i.ibb.co/WHZ3nRJ/visa.png" />
                  </div>
                  <div className="row card-no">
                    <p>{cardForm?.number1}</p>
                    <p>{cardForm?.number2}</p>
                    <p>{cardForm?.number3}</p>
                    <p>{cardForm?.number4}</p>
                  </div>
                  <div className="row card-holder">
                    <p>CARD HPLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name-card">
                    <div className="fname-lname">
                      <p>{cardForm?.fname}</p>
                      <p>{cardForm?.lname}</p>
                    </div>
                    <p>{cardForm?.date}</p>
                  </div>
                </div>
                <div className="back">
                  <img
                    className="map-img"
                    src="https://i.ibb.co/PYss3yv/map.png"
                  />
                  <div className="bar"></div>
                  <div className="row card-cvv">
                    <div>
                      <img src="https://i.ibb.co/S6JG8px/pattern.png" />
                    </div>
                    <p>{cardForm?.ccv}</p>
                  </div>
                  <div className="row card-text">
                    <p>
                      this card is a property of the Test Bank Public Company
                      Limited.
                    </p>
                  </div>
                  <div className="row signature">
                    <p>CUSTOMER SIGNATURE</p>
                    <img src="https://i.ibb.co/WHZ3nRJ/visa.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cotainer-from-card">
            <form onSubmit={handleSubmit(submit)}>
              <div className="card-number">
                <h3>Card Number</h3>
                <div className="input-text-card-number">
                  <Controller
                    control={control}
                    name="number1"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          maxLength={4}
                          placeholder="xxxx"
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="number2"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          maxLength={4}
                          placeholder="xxxx"
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="number3"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          maxLength={4}
                          placeholder="xxxx"
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="number4"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          maxLength={4}
                          placeholder="xxxx"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="card-name">
                <h3>Card Name</h3>
                <div className="input-text-card-name">
                  <Controller
                    control={control}
                    name="fname"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          placeholder="FristName..."
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="lname"
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type="text"
                          placeholder="LastName..."
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="date-ccv">
                <div className="date">
                  <h3>Expiration Date</h3>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => {
                      return <input {...field} type="month" />;
                    }}
                  />
                </div>
                <div className="ccv">
                  <h3>CCV</h3>
                  <Controller
                    control={control}
                    name="ccv"
                    render={({ field }) => {
                      return <input {...field} type="text" maxLength={3} />;
                    }}
                  />
                </div>
              </div>
              <div className="btn-celect">
                <button type="submit">Celect</button>
              </div>
            </form>
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
            <button
              onClick={() => {
                setOpenDialogQR(!openDialogQR);
              }}
            >
              Complete
            </button>
          </div>
        </div>
      </dialog>
    );
  };

  //handleSubmit =================================================================
  const submit = (value: Card) => {
    const item = {
      ...value,
    };
    setCardForm(item);
    setOpenDialogCard(!openDialogCard);
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
