"use client";

import React from "react";
import { PrimeReactProvider } from "primereact/api";

// PrimeReact & PrimeIcons CSS styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface PrimeProviderProps {
  children: React.ReactNode;
}

export function PrimeProvider({ children }: PrimeProviderProps) {
  return (
    <PrimeReactProvider
      value={{
        ripple: true,
        inputStyle: "outlined",
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
