import React from "react";
import arrow from "../../icons/arrow.svg";
import styles from "./SideInfo.module.css";
import { GlobalContext } from "../../GlobalContext";

const SideInfo = () => {
  const global = React.useContext(GlobalContext);
  const isThereExpense = global.transactions.filter(
    (item) => item.type === "expense"
  );

  /* CSS BTN HOVER EFFECT */
  function handleMouseEnter({ target }) {
    const size = target.clientWidth + 1;
    target.style.boxShadow = `inset ${size}px 0 0 0 var(--color-e1)`;
  }
  function handleMouseLeave({ target }) {
    target.style.boxShadow = `inset 0 0 0 0 var(--color-e1)`;
  }
  
  function handleClick() {
    global.setPage("categories");
  }

  return (
    <section className={styles.sideinfo}>
      {isThereExpense.length ? (
        <div>
          <p>Most spending category:</p>
          <div className={styles.category}>
            <div
              className={styles.categoryImg}
              style={{
                backgroundColor: global.numbers.mostSpendingCategory().color,
              }}
            >
              <img src={global.numbers.mostSpendingCategory().logo} alt="" />
            </div>
            <p>{global.numbers.mostSpendingCategory().category}</p>
          </div>
          <p>
            <span>$ {global.numbers.mostSpendingCategory().total}</span> in{" "}
            {global.numbers.mostSpendingCategory().expenses} expenses
          </p>
          {isThereExpense.length > 1 && (
            <div className={styles.mostSpendingCategory}>
              <img src={arrow} alt="" />{" "}
              <p>
                <span>{global.numbers.mostSpendingCategory().difference}%</span>{" "}
                above the 2nd
              </p>
            </div>
          )}
          <button className={styles.categoriesBtn} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Manage categories</button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default SideInfo;
