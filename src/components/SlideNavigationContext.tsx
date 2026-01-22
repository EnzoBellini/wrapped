"use client";

import { createContext, useContext, type ReactNode } from "react";

type SlideNavigationContextType = {
  goTo: (index: number) => void;
};

const SlideNavigationContext = createContext<SlideNavigationContextType | null>(null);

export function SlideNavigationProvider({
  children,
  goTo,
}: {
  children: ReactNode;
  goTo: (index: number) => void;
}) {
  return (
    <SlideNavigationContext.Provider value={{ goTo }}>
      {children}
    </SlideNavigationContext.Provider>
  );
}

export function useSlideNavigation() {
  const context = useContext(SlideNavigationContext);
  if (!context) {
    throw new Error("useSlideNavigation must be used within SlideNavigationProvider");
  }
  return context;
}
