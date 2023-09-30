import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { FilterContextType } from "../interfaces/issueTypes";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string>("");
  const [selectedMilestone, setSelectedMilestone] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        selectedMilestone,
        setSelectedMilestone,
        selectedLabel,
        setSelectedLabel,
        selectedAssignee,
        setSelectedAssignee,
      }}
    >
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
