import React, { createContext, useContext, useState } from 'react';

const HoverContext = createContext({
  hoveredSensorId: null,
  setHoveredSensorId: (id: number | null) => {},
});

export const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredSensorId, setHoveredSensorId] = useState<number | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredSensorId, setHoveredSensorId }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = () => useContext(HoverContext);