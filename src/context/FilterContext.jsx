import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    province: "KPK",
    city: "Peshawar",
    time: "Current",
  });

  const update = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <FilterContext.Provider value={{ filters, update }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
}

export default FilterContext;
