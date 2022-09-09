import React from 'react';
import styles from './Card.module.css';
import Balance from './accounts/Balance';
import Methods from './accounts/Methods';
import Graphic from './accounts/Graphic';
import AddBtns from './accounts/AddBtns';
import SideInfo from './accounts/SideInfo';

const Card = () => {
  return (
    <main className={styles.main}>
      <section className={styles.topComponents}>
        <Balance />
        <AddBtns />
      </section>
      <section className={styles.bottomComponents}>
        <Methods />
        <Graphic />
        <SideInfo />
      </section>
    </main>
  )
}

export default Card;