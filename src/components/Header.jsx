import React from "react";
import logo from "../icons/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerBg}>
      <div className={styles.header}>
        <img src={logo} alt="Logo The Safe" className={styles.headerLogo} />
      </div>
    </header>
  );
};

export default Header;
