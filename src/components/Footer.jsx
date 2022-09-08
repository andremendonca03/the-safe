import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerBg}>
      <div className={styles.footer}>
        <p className={styles.footerP}>The Safe ©</p>
        <p className={styles.footerP}>
          <a href="https://andremendonca.me" target="_blank" rel="noreferrer">
            Andre Mendonca
          </a>{" "}
          - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
