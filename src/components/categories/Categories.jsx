import React from "react";
import styles from "./Categories.module.css";
import { GlobalContext } from "../../GlobalContext";

const Categories = () => {
  const global = React.useContext(GlobalContext);

  const ordinateExpenses =
    global.numbers.expensesPerCategory() &&
    global.numbers.expensesPerCategory().sort((a, b) => b.total - a.total);

  console.log(ordinateExpenses);  

  return (
    <section className={styles.categories}>
      <div
        className={styles.pieChartContainer}
        style={
          ordinateExpenses && {
            background: `
    repeating-conic-gradient(
      from 0deg,
      ${ordinateExpenses.reduce((acc, item, index, array) => {
        if (array.length === 1) {
          return `
            ${
              global.categories[0].find((i) => i.value === item.category).color
            } 0deg ${(
            (3.6 * (ordinateExpenses[0].total * 100)) /
            global.numbers.expenses("all")
          ).toFixed(2)}deg
          `;
        } else if (index === 0) {
          return `
            ${
              global.categories[0].find((i) => i.value === item.category).color
            } 0deg ${(
            (3.6 * (ordinateExpenses[0].total * 100)) /
            global.numbers.expenses("all")
          ).toFixed(2)}deg,
          `;
        } else if (index === ordinateExpenses.length - 1) {
          const arrayReduced = acc.split(" ").reduce((a, i) => {
            if (i && i !== "\n" && i !== ",\n") {
              return [...a, i];
            } else {
              return a;
            }
          }, []);
          const lastItem = Number(
            arrayReduced[arrayReduced.length - 1]
              .replace("deg", "")
              .replace("\n", "")
              .replace(",", "")
          ).toFixed(2);

          return `
            ${acc}
            ${
              global.categories[0].find((i) => i.value === item.category).color
            } ${lastItem}deg 360deg
          `;
        } else {
          const arrayReduced = acc.split(" ").reduce((a, i) => {
            if (i && i !== "\n" && i !== ",\n") {
              return [...a, i];
            } else {
              return a;
            }
          }, []);
          const lastItem = Number(
            arrayReduced[arrayReduced.length - 1]
              .replace("deg", "")
              .replace("\n", "")
              .replace(",", "")
          ).toFixed(2);

          return `
            ${acc}
            ${
              global.categories[0].find((i) => i.value === item.category).color
            } ${lastItem}deg ${
            +lastItem +
            +(
              (3.6 * (ordinateExpenses[index].total * 100)) /
              global.numbers.expenses("all")
            ).toFixed(2)
          }deg,
          `;
        }
      }, 0)}
    )
  `,
          }
        }
      >
        <div className={styles.pieChartCenter}></div>
      </div>

      <div className={styles.categoriesList}>
        {global.numbers.expensesPerCategory() &&
          ordinateExpenses.map((item, index) => {
            return (
              <div className={styles.categoriesItem} key={index}>
                <div
                  className={styles.categoriesImg}
                  style={{
                    backgroundColor: global.categories[0].find(
                      (i) => i.value === item.category
                    ).color,
                  }}
                >
                  <img
                    src={
                      global.categories[0].find(
                        (i) => i.value === item.category
                      ).logo
                    }
                    alt=""
                  />
                </div>
                <p>{item.category}</p>

                <span className={styles.categoriesValue}>
                  {global.balanceHidden ? "— — —" : global.format(item.total)}
                </span>
                <span className={styles.categoriesPercentage}>
                  {(
                    (item.total * 100) /
                    global.numbers.expenses("all")
                  ).toFixed(2)}
                  %
                </span>
              </div>
            );
          })}
      </div>
      {global.transactions.filter((item) => item.type === "expense")[0] ? (
        <></>
      ) : (
        <p>No expenses yet...</p>
      )}
    </section>
  );
};

export default Categories;
