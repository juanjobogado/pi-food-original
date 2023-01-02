import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title) {
      dispatch(getRecipesName(title));
      setTitle("");
    } else {
      alert("Enter correct recipe.");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.inputwrapper}>
        <input
          className={styles.input}
          type="text"
          value={title}
          placeholder="Search Recipe..."
          onChange={(e) => handleChange(e)}
        />
        <button className={styles.btn} type="submit">
          <AiOutlineSearch className={styles.searchIcon} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
