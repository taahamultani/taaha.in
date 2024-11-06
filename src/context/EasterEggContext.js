import React, { createContext, useContext, useState } from 'react';

const EasterEggContext = createContext();

export function useEasterEgg() {
  return useContext(EasterEggContext);
}

export function EasterEggProvider({ children }) {
  const [hasFoundEasterEgg, setHasFoundEasterEgg] = useState(false);

  const findEasterEgg = () => {
    setHasFoundEasterEgg(true);
  };

  const value = {
    hasFoundEasterEgg,
    findEasterEgg
  };

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  );
} 