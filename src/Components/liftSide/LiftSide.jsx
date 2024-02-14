import "./liftside.css";
import { AiOutlineHome } from "react-icons/ai";
import { FaFreeCodeCamp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiCodeAlt } from "react-icons/bi";
import { GiNinjaHead } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { IoFootballSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../store/searchValue";

export default function LiftSide() {
  const dispatch = useDispatch();
  async function handleSearch(value) {
    try {
      dispatch(setSearchValue(value));
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();
  return (
    <div id="leftSide">
      <span
        className="liftSideItems"
        onClick={() => {
          handleSearch("egyptian web Development");
          navigate("/");
        }}
      >
        {" "}
        <AiOutlineHome /> <span>Home</span>
      </span>
      <h5 className="my-3 d-flex justify-content-center">Coding Channels</h5>
      <hr />

      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UCSNkfKl4cU-55Nm-ovsvOHQ");
        }}
      >
        {" "}
        <BiCodeAlt /> <span>Elzero Web School</span>
      </span>
      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UCWX_0VvMxl0_XosvYOZ7O0g");
        }}
      >
        <BiCodeAlt />
        <span>محمد الدسوقى</span>
      </span>
      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UC8butISFwT-Wl7EV0hUK0BQ");
        }}
      >
        <FaFreeCodeCamp />
        <span>freeCodeCamp</span>
      </span>
      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UCW5YeuERMmlnqo4oq8vwUpg");
        }}
      >
        <GiNinjaHead />
        <span>Net Ninja</span>
      </span>
      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UCY38RvRIxYODO4penyxUwTg");
        }}
      >
        <BiCodeAlt />
        <span>Dav Gray</span>
      </span>
      <span
        className="liftSideItems"
        onClick={() => {
          navigate("/channel/UC29ju8bIPH5as8OGnQzwJyA");
        }}
      >
        <BiCodeAlt />
        <span>Traversy Media</span>
      </span>
      <h5 className="my-3 d-flex justify-content-center">sports Channels</h5>
      <hr />
      <span
        className="liftSideItems my-3"
        onClick={() => {
          navigate("/channel/UCMyVy_Q6xXwKFX4UleHk-vg");
        }}
      >
        <CgGym />
        <span> مهووس عضلات /كمال الأجسام </span>
      </span>
      <span
        className="liftSideItems my-2"
        onClick={() => {
          navigate("/channel/UC4GJndVHEhdmqLFBHOCi97A");
        }}
      >
        <CgGym />
        <span>Jordan Yeoh Fitness</span>
      </span>
      <span
        className="liftSideItems my-3"
        onClick={() => {
          navigate("/channel/UC9c89meMU-ES5hb3CVAgIjQ");
        }}
      >
        <IoFootballSharp />
        <span style={{ fontSize: "13px" }}> Mamdouh NasrAllah </span>
      </span>
    </div>
  );
}
