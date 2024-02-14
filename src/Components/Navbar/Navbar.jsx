import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidVideoPlus } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../store/searchValue";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [screenWidth, setScreen] = useState(window.innerWidth);
  useLayoutEffect(function () {
    function handleResize() {
      setScreen(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();
  const [searchValue, setSearch] = useState("");
  const dispatch = useDispatch();
  async function handleSearch() {
    try {
      navigate("/");
      dispatch(setSearchValue(searchValue));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="d-flex flex-column w-100 py-2 " id="Navbar">
      <div className="first-Part " style={{ flexWrap: "wrap" }}>
        <div
          className="ms-2 logo"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer", order: 1 }}
        >
          {" "}
          <img
            src={location.pathname == "/" ? "./youtube.svg" : "../youtube.svg"}
            alt="youtubeLogo"
          />
        </div>

        <InputGroup
          className="d-flex justify-content-center"
          style={{
            order: screenWidth < 425 ? 3 : 2,
            flex: screenWidth < 425 ? "1 0 100%" : "1",
          }}
        >
          <Form.Control
            placeholder="search"
            aria-label="search"
            aria-describedby="basic-addon1"
            className="searchBar"
            name="search"
            value={searchValue}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <InputGroup.Text id="basic-addon1">
            <AiOutlineSearch onClick={handleSearch} />
          </InputGroup.Text>
        </InputGroup>

        <div
          className="d-flex justify-content-between align-items-center icons"
          style={{
            order: screenWidth < 425 ? 2 : 3,
          }}
        >
          <BiSolidVideoPlus />
          <IoIosNotificationsOutline />
          <div className="account">a</div>
        </div>
      </div>
    </div>
  );
}
