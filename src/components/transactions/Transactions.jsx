import React from "react";
import binLogo from "../../icons/bin.svg";
import styles from "./Transactions.module.css";
import { GlobalContext } from "../../GlobalContext";

const Transactions = () => {
  const global = React.useContext(GlobalContext);

  function handleDelete({ currentTarget }) {
    global.setTransactions((prev) =>
      prev.filter((item) => item.id !== Number(currentTarget.id))
    );
  }

  return (
    <section className={styles.transactions}>
      {global.transactionsShow.map((item) => {
        return (
          <div className={styles.transactionsItem} key={item.id}>
            <div
              className={styles.itemImg}
              style={{ backgroundColor: item.color }}
            >
              <img src={item.logo} alt="" />
            </div>
            <p className={styles.itemName}>{item.name}</p>

            <span className={styles.itemValue} data-type={item.type}>
              {global.balanceHidden
                ? "— — —"
                : (item.type === "expense" ? "-" : "+") +
                  global.format(item.value)}
            </span>
            <p className={styles.itemCategory}>{item.category}</p>

            <p className={styles.itemMethod}>{item.method}</p>

            <div
              className={styles.itemDelete}
              id={item.id}
              onClick={handleDelete}
            >
              <img src={binLogo} alt="" />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Transactions;
