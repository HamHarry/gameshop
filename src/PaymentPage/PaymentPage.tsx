import { useState } from "react";
import "./PaymentPage.css";
import "./DialogCash.css";
import "./DialogCard.css";
import "./DialogQR.css";
import "./Card.css";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  addGameDataSelector,
  setAddGameLibary,
  setClaerGame,
  setDeleteGame,
  setSammary,
  summaryGameSelector,
} from "../store/slices/gameSlice";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

interface Card {
  numbers: string[];
  fname: string;
  lname: string;
  date: string;
  ccv: string;
}

const defaultValues: Card = {
  numbers: [],
  fname: "",
  lname: "",
  date: "",
  ccv: "",
};

const PaymentPage = () => {
  const [openDialogCard, setOpenDialogCard] = useState<boolean>(false);
  const [openDialogQR, setOpenDialogQR] = useState<boolean>(false);
  const [openDialogCash, setOpenDialogCash] = useState<boolean>(false);
  const [calculate, setCalculate] = useState<number>(0);
  const [cardForm, setCardForm] = useState<Card>();

  const summary = useSelector(summaryGameSelector);
  const addGameData = useSelector(addGameDataSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control, watch } = useForm<Card>({
    defaultValues,
  });

  const reset = () => {
    // addGame to Libary ======================================================
    dispatch(setAddGameLibary());
    // clearGame to gameData ==================================================
    dispatch(setClaerGame());
    dispatch(setSammary());
    // set initalValue and navigate to Libary =================================
    setCalculate(0);
    setOpenDialogCash(false);
    navigate("/core/home/libary");
  };

  //handleSubmit =================================================================
  const submit = (value: Card) => {
    const item = {
      ...value,
    };
    setCardForm(item);
    setOpenDialogCard(!openDialogCard);
  };
  const submitCalculate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCalculate(value);
  };

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
                    <img src="https://i.ibb.co/G9pDnYJ/chip.png" />
                    <img src="https://i.ibb.co/WHZ3nRJ/visa.png" />
                  </div>
                  <div className="row card-no">
                    <p>{watch("numbers").join(" - ")}</p>
                  </div>
                  <div className="row card-holder">
                    <p>CARD HPLDER</p>
                    <p>VALID TILL</p>
                  </div>
                  <div className="row name-card">
                    <div className="fname-lname">
                      <p>{watch("fname")}</p>
                      <p>{watch("lname")}</p>
                    </div>
                    <p>{watch("date")}</p>
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
                    <p>{watch("ccv")}</p>
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
                    name="numbers.0"
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
                    name="numbers.1"
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
                    name="numbers.2"
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
                    name="numbers.3"
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
                      return (
                        <input
                          {...field}
                          type="text"
                          maxLength={3}
                          placeholder="xxx"
                        />
                      );
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
  const renderDialogCash = () => {
    return (
      <dialog open={openDialogCash}>
        <div className="container-cash">
          <div className="nav-cash">
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialogCash(!openDialogCash);
              }}
            ></i>
          </div>
          <div className="warp-cash">
            <h1>Cash</h1>
            <div className="input-pay">
              <input
                type="number"
                placeholder="Enter your Cash..."
                onChange={submitCalculate}
                value={calculate}
              />
              <button
                onClick={() => {
                  const sum = calculate - summary.total;
                  if (sum >= 0) {
                    alert(
                      `Your change: ${Intl.NumberFormat().format(sum)} THB`
                    );
                    reset();
                  } else {
                    alert("Your money is not enough");
                    setCalculate(0);
                  }
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <div className="container-payment">
      <div className="warp-container-payment">
        <div className="payment-text">
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="listCart-container">
          <div className="warp-listCart-container">
            <div className="show-listCart">
              {addGameData.map((item, index) => {
                return (
                  <div key={index} className="warp-show-listCart">
                    <img src={item.image} alt="" className="warp-logoCart" />
                    <p>{item.name}</p>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => {
                        dispatch(setDeleteGame(item));
                        dispatch(setSammary());
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <div className="show-listPrice">
              <p>Total</p>
              <p>{`${Intl.NumberFormat().format(summary.total)} THB`}</p>
            </div>
          </div>
          <div className="select-card">
            <i className="fa-brands fa-cc-visa">
              <p>{cardForm?.numbers[3]}</p>
            </i>
            <p>
              {cardForm?.fname} {cardForm?.lname}
            </p>
            <p>{cardForm?.date}</p>
          </div>
        </div>
        <div className="btn-payments">
          <button
            onClick={() => {
              setOpenDialogCash(!openDialogCash);
            }}
          >
            Cash
          </button>
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
      {renderDialogCash()}
    </div>
  );
};

export default PaymentPage;
