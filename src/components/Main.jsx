import React from "react";
import styles from "./Main.module.css";
import NavBar from "./NavBar";
import Card from "./Card";

const Main = () => {

  return (
    <div className={styles.mainBg}>
      <NavBar />
      <Card />
    </div>
  );
};

export default Main;
