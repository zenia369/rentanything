import { ReactNode, createContext, useContext, useState } from "react";

const StateContext = createContext<null | {
  state: object;
  setState: ((value: object) => object) | object;
}>(null);

interface StateProviderProps {
  value: object;
  children: ReactNode;
}

export type StateContextType<T> = {
  state: T;
  setState: (cb: (value: T) => T) => void;
};

export const StateProvider = ({ children, value }: StateProviderProps) => {
  const [state, setState] = useState(value);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export function useStateContext<T>() {
  const value = useContext(StateContext);
  if (!value)
    throw new Error("useStateContext was called outside StateProvider");

  return value as StateContextType<
    T extends undefined ? (typeof value)["state"] : T
  >;
}
