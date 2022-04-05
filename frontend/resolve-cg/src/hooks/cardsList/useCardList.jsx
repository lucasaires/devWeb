import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";

const CardListContext = createContext();

export function CardListProvider({ children }) {
  const [list, setList] = useState();
  const [historic, setHistoric] = useState();

  const [valuelist, setValueList] = useState("");

  useEffect(() => {
    async function handleReclamations() {
      const response = await api.get(`/problems/?historic=false`);

      const data = response.data;

      setList(data);
    }
    const handleHistoric = async () => {
      const response = await api.get("/problems/?historic=true");

      const data = response.data;

      setHistoric(data);
    };

    handleReclamations();
    handleHistoric();
  }, []);

  const addCard = async (newCard) => {
    setList([...list, newCard]);
  };

  const changeList = (newList) => {
    setList(newList);
  };

  const changeListFilter = (fill) => {
    setValueList(fill);
  };

  const handleChangeResolve = async (id) => {
    let hash = prompt("Digite o código de confirmação:");

    const response = await api.put(`/changeResolved/${id}/${hash}`);

    if (response.status === 200) {
      alert("Problema resolvido com sucesso!");

      setList(list.filter((item) => item._id !== id));
    }
  };

  const handleSubmitComents = async (id, newComent) => {
    if (list.find((item) => item._id === id)?.isResolved === false) {
      let updatedCard = [{ ...list }];

      const response = await api.post(`/newComent/${id}`, {
        coments: newComent,
      });
      if (response.status === 200) {
        updatedCard = list.map((item) => {
          if (item._id === id) {
            item.coments.push(newComent);
          }
          return item;
        });
      }
      setList(updatedCard);
    } else {
      let updatedCard = [{ ...historic }];

      const response = await api.post(`/newComent/${id}`, {
        coments: newComent,
      });
      if (response.status === 200) {
        updatedCard = historic.map((item) => {
          if (item._id === id) {
            item.coments.push(newComent);
          }
          return item;
        });
      }
      setHistoric(updatedCard);
    }
  };

  const setLikes = async (id) => {
    if (list.find((item) => item._id === id)?.isResolved === false) {
      let updatedCard = [{ ...list }];
      const response = await api.put(`editLike/${id}`);

      if (response.status === 200) {
        updatedCard = list.map((item) => {
          if (item._id === id) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });
        setList(updatedCard);
      }
    } else {
      let updatedCard = [{ ...historic }];
      const response = await api.put(`editLike/${id}`);

      if (response.status === 200) {
        updatedCard = historic.map((item) => {
          if (item._id === id) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });
        setHistoric(updatedCard);
      }
    }
  };

  const deleteCard = async (id) => {
    if (list.find((item) => item._id === id)?.isResolved === false) {
      let hash = prompt("Digite o código de confirmação:");

      const response = await api.delete(`/deleteProblem/${id}/${hash}`);

      if (response.status === 200) {
        setList(list.filter((item) => item._id !== id));
      }
    } else {
      let hash = prompt("Digite o código de confirmação:");

      const response = await api.delete(`/deleteProblem/${id}/${hash}`);

      if (response.status === 200) {
        setHistoric(historic.filter((item) => item._id !== id));
      }
    }
  };

  return (
    <CardListContext.Provider
      value={{
        addCard,
        list,
        historic,
        changeList,
        valuelist,
        changeListFilter,
        handleChangeResolve,
        deleteCard,
        setLikes,
        handleSubmitComents,
      }}
    >
      {children}
    </CardListContext.Provider>
  );
}

export function useCardList() {
  const context = useContext(CardListContext);
  return context;
}
