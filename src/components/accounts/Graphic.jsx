import React from "react";
import styles from "./Graphic.module.css";
import { GlobalContext } from "../../GlobalContext";

const Graphic = () => {
  const global = React.useContext(GlobalContext);

  function barsStyle(type) {
    const earningsValue = Number(global.numbers.earnings(global.method).replace(",", ""));
    const expensesValue = Number(global.numbers.expenses(global.method).replace(",", ""));
    const isEarningsBigger = earningsValue > expensesValue;

    if (earningsValue + expensesValue === 0) {
      return { height: "150px", backgroundColor: "var(--color-b1)" };
    } else if (
      (isEarningsBigger && type === "earnings") ||
      (!isEarningsBigger && type === "expenses") ||
      earningsValue === expensesValue
    ) {
      return { height: "150px" };
    } else {
      if (type === "earnings") {
        return { height: `${(150 / expensesValue) * earningsValue}px` };
      } else if (type === "expenses") {
        return { height: `${(150 / earningsValue) * expensesValue}px` };
      }
    }
  }

  return (
    <section>
      <span className={styles.title} style={{ textTransform: "capitalize" }}>
        {global.method}
      </span>

      <div className={styles.bars}>
        <div className={styles.greenBar} style={barsStyle("earnings")}></div>
        <div className={styles.redBar} style={barsStyle("expenses")}></div>
      </div>

      <div className={styles.data}>
        <div className={styles.dataEarnings}>
          <span>
            ${" "}
            {global.balanceHidden
              ? "— — —"
              : global.numbers.earnings(global.method)}
          </span>
          <p>Earnings</p>
        </div>
        <div className={styles.dataExpenses}>
          <span>
            ${" "}
            {global.balanceHidden
              ? "— — —"
              : global.numbers.expenses(global.method)}
          </span>
          <p>Expenses</p>
        </div>
        <div className={styles.dataTotal}>
          <span>
            ${" "}
            {global.balanceHidden
              ? "— — —"
              : global.numbers.total(global.method)}
          </span>
          <p>Total</p>
        </div>
      </div>
    </section>
  );
};

export default Graphic;
