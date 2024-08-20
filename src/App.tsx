import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
