import React, { PropsWithChildren, createContext, useContext } from "react";

import { RootStore } from "src/store";

const StoreContext = createContext<RootStore>(new RootStore());

export const StoreProvider: React.FC<PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
