import { createContext, useState } from "react";

import BlogTable from "./BlogTable.tsx";
import BlogAdd from "./BlogAdd.tsx";
import BlogView from "./BlogView.tsx";

type BlogTableContextType = {
  tableState: boolean;
  setTableState: React.Dispatch<React.SetStateAction<boolean>>;
};

type BlogViewContextType = {
  viewState: boolean;
  setViewState: React.Dispatch<React.SetStateAction<boolean>>;
};

// BlogTableContext gets passed two parameters, tableState and setTableState
// the types for both of these need to be accounted for which is why I declare their types
export const BlogTableContext = createContext<BlogTableContextType | null>(
  null
);

export const BlogViewContext = createContext<BlogViewContextType | null>(null);

function App() {
  const [tableState, setTableState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);

  return (
    <BlogTableContext.Provider value={{ tableState, setTableState }}>
      <BlogViewContext.Provider value={{ viewState, setViewState }}>
        <div className="flex gap-6">
          <BlogTable></BlogTable>
          <BlogAdd></BlogAdd>
          <BlogView></BlogView>
        </div>
      </BlogViewContext.Provider>
    </BlogTableContext.Provider>
  );
}

export default App;
