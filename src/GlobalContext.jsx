import React from "react";
import logoHouse from "./icons/categories/house.svg";
import logoHealth from "./icons/categories/health.svg";
import useLocalStorage from "./hooks/useLocalStorage";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const categories = [
    {
      name: "House",
      logo: logoHouse,
      value: "house",
    },
    {
      name: "Health",
      logo: logoHealth,
      value: "health",
    }
  ];

  const [page, setPage] = React.useState("account");
  const [balanceHidden, setBalanceHidden] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const [method, setMethod] = React.useState("all");
  const [modal, setModal] = React.useState({ active: false, type: "" });
  const [newTransaction, setNewTransaction] = React.useState({
    id: 0,
    type: "",
    name: "",
    category: "",
    method: "",
    value: 0,
  });

  const [transactions, setTransactions] = React.useState([]);

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
        const unformattedEarnings = Number(numbers.earnings("all").replace(",", ""));
        const unformattedExpenses = Number(numbers.expenses("all").replace(",", ""));

        return format(unformattedEarnings - unformattedExpenses);
      } else {
        const unformattedEarnings = Number(numbers.earnings(method).replace(",", ""));
        const unformattedExpenses = Number(numbers.expenses(method).replace(",", ""));

        return format(unformattedEarnings - unformattedExpenses);
      }
    },
  };

  function format(n) {
    const negative = n < 0;
    const stringed = n.toFixed(2).toString().replace(".", "").replace(",", "").replace("-", "");
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
  console.log(JSON.parse(database));
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
    )
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
        numbers,
        categories,
        format,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
