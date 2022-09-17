import React from "react";
import styles from "./Method.module.css";
import { GlobalContext } from "../../GlobalContext";

const Method = () => {
  const global = React.useContext(GlobalContext);

  function handleChange({ target }) {
    global.setMethod(target.value);
  }

  return (
    <select
      className={styles.select}
      value={global.method}
      onChange={handleChange}
    >
      <option value="all">All</option>
      <option value="card">Card</option>
      <option value="cash">Cash</option>
      <option value="paypal">Paypal</option>
    </select>
  );
};

export default Method;
