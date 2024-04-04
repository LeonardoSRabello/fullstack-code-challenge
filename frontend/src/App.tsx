import React from "react";
import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "src/modules/storeProvider";
import Routes from "./routes";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
