import Navbar from "../Navbar/Navbar";
import "./PaymentPage.css";

const PaymentPage = () => {
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
          <button>Debit Card</button>
          <button>QR Code</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
