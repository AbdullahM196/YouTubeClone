import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import SecondNav from "./Components/Navbar/secondNav";
import LiftSide from "./Components/liftSide/LiftSide";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="app d-flex flex-column">
        <Navbar />
        <div className="body ">
          {(location.pathname == "/" ||
            location.pathname.startsWith("/channel/")) && <LiftSide />}
          <div
            className={`d-flex flex-column ${
              location.pathname.startsWith("/details/")
                ? "w-100"
                : "MainContent"
            } `}
          >
            {location.pathname == "/" && <SecondNav />}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
