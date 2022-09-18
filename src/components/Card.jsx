import React from "react";
import styles from "./Card.module.css";

import Transactions from "./transactions/Transactions";
import Method from "./transactions/Method";

import Balance from "./accounts/Balance";
import Methods from "./accounts/Methods";
import Graphic from "./accounts/Graphic";
import AddBtns from "./accounts/AddBtns";
import SideInfo from "./accounts/SideInfo";

import Categories from "./categories/Categories";
import TotalExpenses from "./categories/TotalExpenses";

import { GlobalContext } from "../GlobalContext";

const Card = () => {
  const global = React.useContext(GlobalContext);

  const isTransactions = global.page === "transactions";
  const isAccounts = global.page === "account";
  const isCategories = global.page === "categories";

  return (
    <main className={styles.main}>
      {isTransactions ? (
        <article>
          <section className={styles.topComponents}>
            <Balance />
            <Method />
          </section>
          <section className={styles.bottomComponents}>
            <Transactions />
          </section>
        </article>
      ) : (
        <></>
      )}

      {isAccounts ? (
        <article>
          <section className={styles.topComponents}>
            <Balance />
            <AddBtns />
          </section>
          <section className={styles.bottomComponents}>
            <Methods />
            <Graphic />
            <SideInfo />
          </section>
        </article>
      ) : (
        <></>
      )}

      {isCategories ? (
        <article>
          <section className={styles.topComponents}>
            <Balance />
            <TotalExpenses />
          </section>
          <section className={styles.bottomComponents}>
            <Categories />
          </section>
        </article>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Card;
