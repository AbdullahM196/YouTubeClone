import { useDispatch } from "react-redux";
import "./navbar.css";
import { setSearchValue } from "../../store/searchValue";

export default function SecondNav() {
  const dispatch = useDispatch();
  async function handleSearch(value) {
    try {
      dispatch(setSearchValue(value));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="secondNav w-100">
      <ul>
        <li
          onClick={() => {
            handleSearch("web Development in English");
          }}
        >
          All
        </li>
        <li
          onClick={() => {
            handleSearch("Trending in Egypt");
          }}
        >
          Trending
        </li>
        <li
          onClick={() => {
            handleSearch("React Js in English");
          }}
        >
          React Js
        </li>
        <li
          onClick={() => {
            handleSearch("Javascript in arabic");
          }}
        >
          Javascript
        </li>
        <li
          onClick={() => {
            handleSearch("Node Js");
          }}
        >
          Node Js
        </li>
        <li
          onClick={() => {
            handleSearch("Music in Egypt");
          }}
        >
          Music
        </li>
        <li
          onClick={() => {
            handleSearch("Movies in Egypt");
          }}
        >
          Movies
        </li>
        <li
          onClick={() => {
            handleSearch("Gaming in Egypt");
          }}
        >
          Gaming
        </li>
        <li
          onClick={() => {
            handleSearch("Live in Egypt");
          }}
        >
          Live
        </li>
        <li
          onClick={() => {
            handleSearch("News in Egypt");
          }}
        >
          News
        </li>
      </ul>
    </div>
  );
}
