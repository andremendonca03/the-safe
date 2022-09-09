import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const example = [
    {
      id: 0,
      type: "expense",
      name: "House Gardening",
      category: "house",
      method: "card",
      value: 200.0,
    },
    {
      id: 1,
      type: "earning",
      name: "Salary 1",
      category: "salary",
      method: "cash",
      value: 400.0,
    },
  ];

  const [page, setPage] = React.useState("account");
  const [balanceHidden, setBalanceHidden] = React.useState(false);

  const [method, setMethod] = React.useState("all");

  const [transactions, setTransactions] = React.useState(example);

  const [numbers, setNumbers] = React.useState({
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
        return format(numbers.earnings("all") - numbers.expenses("all"));
      } else {
        return format(numbers.earnings(method) - numbers.expenses(method));
      }
    },
  });

  function format(n) {
    const negative = n < 0;
    const stringed = n.toFixed(2).toString().replace(".", "").replace("-", "");
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

  return (
    <GlobalContext.Provider
      value={{
        useLocalStorage,
        page,
        setPage,
        balanceHidden,
        setBalanceHidden,
        method,
        setMethod,
        transactions,
        setTransactions,
        numbers,
        setNumbers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
