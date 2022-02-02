import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";

const CardListContext = createContext();

export function CardListProvider({ children }) {
  const [list, setList] = useState();
  const [valuelist, setValueList] = useState("");

  useEffect(() => {
    async function handleReclamations() {
      const response = await api.get(`/problems/?historic=false`);

      const data = response.data;
      setList(data);
    }

    handleReclamations();
  }, []);

  const changeList = (newList) => {
    setList(newList);
  };

  const changeListFilter = (fill) => {
    setValueList(fill);
  };

  return (
    <CardListContext.Provider
      value={{ list, changeList, valuelist, changeListFilter }}
    >
      {children}
    </CardListContext.Provider>
  );
}

export function useCardList() {
  const context = useContext(CardListContext);
  return context;
}
