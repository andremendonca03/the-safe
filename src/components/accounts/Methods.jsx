import React from "react";
import money from "../../icons/money.svg";
import card from "../../icons/card.svg";
import cash from "../../icons/cash.svg";
import paypal from "../../icons/paypal.svg";
import styles from "./Methods.module.css";
import { GlobalContext } from "../../GlobalContext";

const Methods = () => {
  const global = React.useContext(GlobalContext);

  function handleClick({ currentTarget }) {
    global.setMethod(currentTarget.id);
  }

  React.useEffect(() => {
    const methods = document.querySelectorAll(`.${styles.methods} div`);

    methods.forEach((item) => {
      if (item.id === global.method) {
        item.setAttribute("data-active", "true");
      } else {
        item.setAttribute("data-active", "false");
      }
    });
  }, [global.method]);

  return (
    <section className={styles.methods}>
      <div id="all" onClick={handleClick}>
        <img src={money} alt="Money Icon" />
        <span>All</span>
      </div>

      <div id="card" onClick={handleClick}>
        <img src={card} alt="Card Icon" />
        <span>Card</span>
      </div>

      <div id="cash" onClick={handleClick}>
        <img src={cash} alt="Cash Icon" />
        <span>Cash</span>
      </div>

      <div id="paypal" onClick={handleClick}>
        <img src={paypal} alt="Paypal Icon" />
        <span>Paypal</span>
      </div>
    </section>
  );
};

export default Methods;
