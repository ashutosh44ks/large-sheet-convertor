import { use } from "react";
import { DataContext, type DataContextType } from "./DataContext";

export const useDataContext = (): DataContextType => {
  const context = use(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }

  return context;
};
