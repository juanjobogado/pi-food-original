import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.Loading}>
      <div className={styles.divLoading}>
        <img
          className={styles.gif}
          src="https://media.giphy.com/avatars/ChefSpecial/kVnqwZ5gbfe4.gif"
        />
        <h4 className={styles.loading}>Loading...</h4>
      </div>
    </div>
  );
}
