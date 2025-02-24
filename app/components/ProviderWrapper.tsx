import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@global/store/store";
import { PersistGate } from "redux-persist/integration/react";

function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ProviderWrapper;
