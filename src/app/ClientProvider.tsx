"use client";
import React, { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "aos/dist/aos.css";
import AOS from "aos";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "./provider/User";

const ClientProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      // You can add your custom AOS configurations here
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}> 

        <PersistGate loading={null} persistor={persistor}> 
          <UserProvider >             
          {children}
          </UserProvider>
          <Toaster />
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default ClientProvider;
