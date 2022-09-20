import React from "react";
import styles from "./TotalExpenses.module.css";
import { GlobalContext } from "../../GlobalContext";

const TotalExpenses = () => {
  const global = React.useContext(GlobalContext);

  return (
    <div className={styles.totalExpenses}>
      Total Expenses:{" "}
      <span>
        $ {global.balanceHidden ? "— — —" : global.format(global.numbers.expenses("all"))}
      </span>
    </div>
  );
};

export default TotalExpenses;
