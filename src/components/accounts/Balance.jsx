import React from "react";
import eyeIcon from "../../icons/eye.svg";
import eyeOffIcon from "../../icons/eye-off.svg";
import styles from "./Balance.module.css";
import { GlobalContext } from "../../GlobalContext";

const Balance = () => {
  const global = React.useContext(GlobalContext);

  function handleClick() {
    global.setBalanceHidden((prev) => !prev);
  }

  return (
    <section className={styles.balance}>
      <p>Overall Balance:</p>
      <div className={styles.value}>
        <span
          style={{ color: global.numbers.total("all") < 0 ? "var(--color-d0)" : "var(--color-m0)" }}
        >
          $ {global.balanceHidden ? "— — —" : global.format(global.numbers.total("all"))}
        </span>
        <img
          src={global.balanceHidden ? eyeIcon : eyeOffIcon}
          alt="Eye Icon"
          onClick={handleClick}
        />
      </div>
    </section>
  );
};

export default Balance;
