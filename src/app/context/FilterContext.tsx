import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string>("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
