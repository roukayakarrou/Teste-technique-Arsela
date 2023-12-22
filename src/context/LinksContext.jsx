import { createContext, useContext, useEffect, useReducer, useState} from "react";

export const actions = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
  DELETEALL: "deleteAll",
  GET_LOCAL_STORAGE_ITEMS: "getLocalStorageItems",
};

const context = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.ADD: {
      if (payload === "") {
        return state;
      }
      const newCounter = state.counter + 1;
      const newLink = {
        id: newCounter,
        link: payload,
      };
      return {
        counter: newCounter,
        Links: [...state.Links, newLink],
      };
    }

    case actions.DELETE: {
      return {
        counter: state.counter,
        Links: state.Links.filter((i) => i.id !== payload),
      };
    }

    case actions.EDIT: {
      const updatedLinks = state.Links.map((link) => {
        if (link.id === payload.id) {
          return { ...link, link: payload.updatedText };
        }
        return link;
      });
      return {
        ...state,
        Links: updatedLinks,
      };
    }

    case actions.DELETEALL: {
      return initialState;
    }

    case actions.GET_LOCAL_STORAGE_ITEMS: {
      return payload;
    }
  }
};

const initialState = {
  counter: 0,
  Tasks: [],
};

export const useLinksContext = () => {
  return useContext(context);
};

const LinksContext = ({ children }) => {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("Links"));
    if (items) {
      dispatch({
        type: actions.GET_LOCAL_STORAGE_ITEMS,
        payload: items,
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("Links", JSON.stringify(state));
    }
  }, [state]);

  return (
    <context.Provider value={{ state, dispatch, text, setText }}>
      {children}
    </context.Provider>
  );
};

export default LinksContext;
