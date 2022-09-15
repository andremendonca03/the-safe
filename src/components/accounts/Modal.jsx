import React from "react";
import styles from "./Modal.module.css";
import { GlobalContext } from "../../GlobalContext";

const Modal = () => {
  const global = React.useContext(GlobalContext);

  /*document.addEventListener("click", (e) => {
    console.log(e.target.closest(`.${styles.modal}`));
    const modalBox = document.querySelector(`.${styles.modal}`);
    if (e.target.closest(`.${styles.modal}`) === null) {
      console.log("E null");

    } else if (e.target.closest(`.${styles.modal}`) === modalBox) {
      console.log("E dentro");
    } else {
      console.log("fecha");
      
    }
  });*/

  const modalType = React.useRef();
  const submitBtn = React.useRef();
  React.useEffect(() => {
    modalType.current.setAttribute("data-type", global.modal.type);
    submitBtn.current.setAttribute("data-type", global.modal.type);
  }, [global.modal]);

  function handleChangeType({ target }) {
    global.setModal({ active: true, type: target.id });
  }

  function handleChange({ target }) {
    if (target.id === "value") {
      global.setNewTransaction((prev) => {
        return { ...prev, value: Number(target.value) };
      });
    } else {
      global.setNewTransaction((prev) => {
        return {
          ...prev,
          [target.id]: target.value,
          id: global.count,
        };
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (global.newTransaction.value > 0) {
      global.setTransactions((prev) => [...prev, global.newTransaction]);
    }

    global.setCount((prev) => prev + 1);
    handleClose();
  }

  const modalBox = React.useRef();
  function handleClickOutside(e) {
    if (!e.nativeEvent.composedPath().includes(modalBox.current)) {
      handleClose();
    }
  }

  function handleClose() {
    global.setModal({ active: false, type: "" });
    global.setNewTransaction({
      id: 0,
      type: "",
      name: "",
      category: "",
      method: "",
      value: 0,
    });
  }

  React.useEffect(() => {
    global.setNewTransaction((prev) => {
      return { ...prev, type: global.modal.type };
    });
  }, [global.modal]);

  return (
    <section className={styles.modalContainer} onClick={handleClickOutside}>
      <div className={styles.modal} ref={modalBox}>
        <div className={styles.modalType} ref={modalType}>
          <button id="expense" onClick={handleChangeType}>
            Expense
          </button>
          <button id="earning" onClick={handleChangeType}>
            Earning
          </button>
        </div>

        {global.modal.type && (
          <form className={styles.modalDetails} onSubmit={handleSubmit}>
            <div className={styles.detailsValue}>
              <label>
                Value
                <input
                  type="number"
                  id="value"
                  placeholder="0.00"
                  value={global.newTransaction.value}
                  required
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles.detailsName}>
              <label>
                Name
                <input
                  type="text"
                  id="name"
                  placeholder="Add a name"
                  value={global.newTransaction.name}
                  required
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles.detailsCategory}>
              <label>
                Category
                <select
                  id="category"
                  value={global.newTransaction.category}
                  required
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select
                  </option>
                  {global.modal.type === "expense"
                    ? global.categories[0].map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })
                    : global.categories[1].map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                </select>
              </label>
            </div>

            <div className={styles.detailsMethod}>
              <label>
                Method
                <select
                  id="method"
                  value={global.newTransaction.method}
                  required
                  onChange={handleChange}
                >
                  <option disabled value={""}>
                    Select
                  </option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="paypal">Paypal</option>
                </select>
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} ref={submitBtn}>
              Add {global.modal.type}
            </button>
          </form>
        )}

        <button className={styles.modalClose} onClick={handleClose}>
          X
        </button>
      </div>
    </section>
  );
};

export default Modal;
