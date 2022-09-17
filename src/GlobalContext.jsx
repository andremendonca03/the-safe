import React from "react";
import logoClothing from "./icons/categories/clothing.svg";
import logoDonations from "./icons/categories/donations.svg";
import logoEducation from "./icons/categories/education.svg";
import logoEntertainment from "./icons/categories/entertainment.svg";
import logoFood from "./icons/categories/food.svg";
import logoGifts from "./icons/categories/gifts.svg";
import logoHealth from "./icons/categories/health.svg";
import logoHouse from "./icons/categories/house.svg";
import logoShopping from "./icons/categories/shopping.svg";
import logoTransportation from "./icons/categories/transportation.svg";
import logoTravel from "./icons/categories/travel.svg";
import logoWork from "./icons/categories/work.svg";

import logoInvestments from "./icons/categories/investments.svg";
import logoRewards from "./icons/categories/rewards.svg";
import logoSalary from "./icons/categories/salary.svg";
import logoOthers from "./icons/categories/others.svg";

import useLocalStorage from "./hooks/useLocalStorage";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [page, setPage] = React.useState("transactions");
  const [balanceHidden, setBalanceHidden] = React.useState(false);
  const [count, setCount] = React.useState(17);

  const [method, setMethod] = React.useState("all");
  const [modal, setModal] = React.useState({ active: false, type: "" });
  const [newTransaction, setNewTransaction] = React.useState({
    id: 0,
    type: "",
    name: "",
    category: "",
    logo: "",
    color: "",
    method: "",
    value: 0,
  });

  const [transactions, setTransactions] = React.useState([]);

  const transactionsShow = transactions.reduce((acc, item) => {
    if (method === "all") {
      return [...acc, item];
    } else if (method === item.method) {
      return [...acc, item];
    } else {
      return acc;
    }
  }, []);

  const categories = [
    [
      {
        name: "Clothing",
        logo: logoClothing,
        color: "#9C670B",
        value: "clothing",
        original: true,
        id: 0,
      },
      {
        name: "Donations",
        logo: logoDonations,
        color: "#0FD467",
        value: "donations",
        original: true,
        id: 1,
      },
      {
        name: "Education",
        logo: logoEducation,
        color: "#D4D40F",
        value: "education",
        original: true,
        id: 2,
      },
      {
        name: "Entertainment",
        logo: logoEntertainment,
        color: "#7B0FD4",
        value: "entertainment",
        original: true,
        id: 3,
      },
      {
        name: "Food",
        logo: logoFood,
        color: "#D43D0F",
        value: "food",
        original: true,
        id: 4,
      },
      {
        name: "Gifts",
        logo: logoGifts,
        color: "#D40FB6",
        value: "gifts",
        original: true,
        id: 5,
      },
      {
        name: "Health",
        logo: logoHealth,
        color: "#0FC0D4",
        value: "health",
        original: true,
        id: 6,
      },
      {
        name: "House",
        logo: logoHouse,
        color: "#0F6BD4",
        value: "house",
        original: true,
        id: 7,
      },
      {
        name: "Shopping",
        logo: logoShopping,
        color: "#D40F61",
        value: "shopping",
        original: true,
        id: 8,
      },
      {
        name: "Transportation",
        logo: logoTransportation,
        color: "#EB8E05",
        value: "transportation",
        original: true,
        id: 9,
      },
      {
        name: "Travel",
        logo: logoTravel,
        color: "#0F15D4",
        value: "travel",
        original: true,
        id: 10,
      },
      {
        name: "Work",
        logo: logoWork,
        color: "#585E56",
        value: "work",
        original: true,
        id: 11,
      },
      {
        name: "Other Expenses",
        logo: logoOthers,
        color: "#B0BEAC",
        value: "others",
        original: true,
        id: 12,
      },
    ],
    [
      {
        name: "Rewards",
        logo: logoRewards,
        color: "#7ED40F",
        value: "rewards",
        original: true,
        id: 13,
      },
      {
        name: "Investments",
        logo: logoInvestments,
        color: "#0FD41F",
        value: "investments",
        original: true,
        id: 14,
      },
      {
        name: "Salary",
        logo: logoSalary,
        color: "#0FD467",
        value: "salary",
        original: true,
        id: 15,
      },
      {
        name: "Other Earnings",
        logo: logoOthers,
        color: "#0FD4BD",
        value: "others",
        original: true,
        id: 16,
      },
    ],
  ];

  const numbers = {
    earnings: (method) => {
      if (method === "all") {
        return format(
          transactions.reduce((acc, item) => {
            if (item.type === "earning") {
              return acc + item.value;
            } else {
              return acc;
            }
          }, 0)
        );
      } else {
        return format(
          transactions
            .filter((item) => item.method === method)
            .reduce((acc, item) => {
              if (item.type === "earning") {
                return acc + item.value;
              } else {
                return acc;
              }
            }, 0)
        );
      }
    },
    expenses: (method) => {
      if (method === "all") {
        return format(
          transactions.reduce((acc, item) => {
            if (item.type === "expense") {
              return acc + item.value;
            } else {
              return acc;
            }
          }, 0)
        );
      } else {
        return format(
          transactions
            .filter((item) => item.method === method)
            .reduce((acc, item) => {
              if (item.type === "expense") {
                return acc + item.value;
              } else {
                return acc;
              }
            }, 0)
        );
      }
    },
    total: (method) => {
      if (method === "all") {
        const unformattedEarnings = Number(
          numbers.earnings("all").replace(",", "")
        );
        const unformattedExpenses = Number(
          numbers.expenses("all").replace(",", "")
        );

        return format(unformattedEarnings - unformattedExpenses);
      } else {
        const unformattedEarnings = Number(
          numbers.earnings(method).replace(",", "")
        );
        const unformattedExpenses = Number(
          numbers.expenses(method).replace(",", "")
        );

        return format(unformattedEarnings - unformattedExpenses);
      }
    },
    mostSpendingCategory: () => {
      const allExpenses = transactions.filter(
        (item) => item.type === "expense"
      );

      if (allExpenses.length) {
        const expensesPerCategory = categories[0]
          .map((category) => {
            const epCategory = allExpenses.filter((item) => {
              return item.category === category.value;
            });
            return epCategory;
          })
          .filter((item) => item.length);

        const expensesPerCategoryFormatted = expensesPerCategory.map((item) => {
          const expensesTotal = item.reduce((acc, i) => {
            return acc + i.value;
          }, 0);
          return { category: item[0].category, total: expensesTotal };
        });

        const msCategory = expensesPerCategoryFormatted.reduce(
          (acc, item) => {
            if (acc.total > item.total) {
              return acc;
            } else {
              return item;
            }
          },
          { total: 0 }
        );

        const ndMostSpendingCategory = expensesPerCategoryFormatted
          .reduce((acc, item) => {
            if (item.category !== msCategory.category) {
              return [...acc, item];
            } else {
              return acc;
            }
          }, [])
          .reduce(
            (acc, item) => {
              if (acc.total > item.total) {
                return acc;
              } else {
                return item;
              }
            },
            { total: 0 }
          );

        const returnObject = {
          category: msCategory.category,
          total: format(msCategory.total),
          expenses: transactions.filter(
            (item) => item.category === msCategory.category
          ).length,
          logo: categories[0].find((item) => item.value === msCategory.category)
            .logo,
          color: categories[0].find(
            (item) => item.value === msCategory.category
          ).color,
          difference: (
            (100 / ndMostSpendingCategory.total) * msCategory.total -
            100
          ).toFixed(0),
        };
        return returnObject;
      }
    },
  };

  function format(n) {
    const negative = n < 0;
    const stringed = n
      .toFixed(2)
      .toString()
      .replace(".", "")
      .replace(",", "")
      .replace("-", "");
    const cents = stringed.slice(-2);
    const full = stringed.replace(cents, "").split("");
    let count = 0;
    const final = full.reduceRight((acc, item) => {
      if (count < 3) {
        count += 1;
        return `${item}${acc}`;
      } else {
        count = 1;
        return `${item},${acc}`;
      }
    }, "");
    return `${negative ? "-" : ""}${final}.${cents}`;
  }

  const [database, setDatabase] = useLocalStorage(
    "database",
    `
    {
      "balanceHidden": ${balanceHidden},
      "count": ${count},
      "transactions": ${JSON.stringify(transactions)}
    }
  `
  );

  const databaseObject = JSON.parse(database);
  React.useEffect(() => {
    setBalanceHidden(databaseObject.balanceHidden);
    setCount(databaseObject.count);
    setTransactions(databaseObject.transactions);
  }, []);

  React.useEffect(() => {
    setDatabase(
      `
        {
          "balanceHidden": ${balanceHidden},
          "count": ${count},
          "transactions": ${JSON.stringify(transactions)}
        }
      `
    );
  }, [balanceHidden, count, transactions, setDatabase]);

  return (
    <GlobalContext.Provider
      value={{
        useLocalStorage,
        page,
        setPage,
        balanceHidden,
        setBalanceHidden,
        count,
        setCount,
        method,
        setMethod,
        modal,
        setModal,
        newTransaction,
        setNewTransaction,
        transactions,
        setTransactions,
        transactionsShow,
        categories,
        numbers,
        format,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
