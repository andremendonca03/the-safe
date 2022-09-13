import React from "react";
import styles from "./AddBtns.module.css";
import { GlobalContext } from "../../GlobalContext";
import Modal from "./Modal";

const AddBtns = () => {
  const global = React.useContext(GlobalContext);

  /* CSS BTN HOVER EFFECT */
  function handleMouseEnter({ target }) {
    const size = target.clientWidth + 1;
    target.style.boxShadow = `inset ${size}px 0 0 0 var(--color-${
      target.className.includes("expenses") ? "d0" : "m0"
    })`;
  }
  function handleMouseLeave({ target }) {
    target.style.boxShadow = `inset 0 0 0 0 var(--color-${
      target.className.includes("expenses") ? "d0" : "m0"
    })`;
  }

  function handleClick({ target }) {
    global.setModal({active: true, type: `${target.id}`});
  }

  return (
    <>
      <section className={styles.addBtns}>
        <div
          className={styles.expensesBtn}
          id="expense"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          Add Expense
        </div>

        <div
          className={styles.earningsBtn}
          id="earning"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          Add Earning
        </div>
      </section>

      {global.modal.active && <Modal />}
    </>
  );
};

export default AddBtns;
