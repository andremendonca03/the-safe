import React from "react";
import styles from "./NavBar.module.css";
import { GlobalContext } from "../GlobalContext";

const NavBar = () => {
  const global = React.useContext(GlobalContext);

  function handleClick(e) {
    e.preventDefault();
    global.setPage(e.target.id);
  }

  React.useEffect(() => {
    const btns = document.querySelectorAll(`.${styles.navBar} button`);
    btns.forEach(item => {
      if (item.id === global.page) {
        item.setAttribute("data-active", "true");
      } else {
        item.setAttribute("data-active", "false");
      }
    });
  }, [global.page]);

  return (
    <nav className={styles.navBar}>
      <button id="transactions" onClick={handleClick}>
        Transactions
      </button>
      <button id="account" onClick={handleClick}>
        Account
      </button>
      <button id="analytics" onClick={handleClick}>
        Analytics
      </button>
    </nav>
  );
};

export default NavBar;
