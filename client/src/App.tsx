import { createContext, useState } from "react";
import BlogTable from "./BlogTable.tsx";
import BlogAdd from "./BlogAdd.tsx";
import BlogView from "./BlogView.tsx";
import { AnimatePresence } from "motion/react";

type BlogTableContextType = {
  tableState: boolean;
  setTableState: React.Dispatch<React.SetStateAction<boolean>>;
};

type BlogViewContextType = {
  viewState: boolean;
  setViewState: React.Dispatch<React.SetStateAction<boolean>>;
};

type BlogIDContextType = {
  blogID: string;
  setBlogID: React.Dispatch<React.SetStateAction<string>>;
};

type BlogAddModalContextType = {
  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// BlogTableContext gets passed two parameters, tableState and setTableState
// the types for both of these need to be accounted for which is why I declare their types
export const BlogTableContext = createContext<BlogTableContextType | null>(
  null
);
export const BlogViewContext = createContext<BlogViewContextType | null>(null);
export const BlogIDContext = createContext<BlogIDContextType | null>(null);
export const BlogAddModalContext =
  createContext<BlogAddModalContextType | null>(null);

function App() {
  const [tableState, setTableState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);
  const [blogID, setBlogID] = useState<string>("");
  const [addOpen, setAddOpen] = useState(false);

  return (
    <BlogAddModalContext.Provider value={{ addOpen, setAddOpen }}>
      <BlogTableContext.Provider value={{ tableState, setTableState }}>
        <BlogViewContext.Provider value={{ viewState, setViewState }}>
          <BlogIDContext.Provider value={{ blogID, setBlogID }}>
            <div className="flex gap-6">
              <BlogTable></BlogTable>
              <AnimatePresence>
                {addOpen ? <BlogAdd></BlogAdd> : null}
              </AnimatePresence>
              {/* <BlogAdd></BlogAdd> */}
              {/* <BlogView></BlogView> */}
            </div>
          </BlogIDContext.Provider>
        </BlogViewContext.Provider>
      </BlogTableContext.Provider>
    </BlogAddModalContext.Provider>
  );
}

export default App;
