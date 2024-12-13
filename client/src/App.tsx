import { createContext, useState } from "react";
import { motion } from "motion/react";

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

type BlogIDContextType = {
  blogID: string;
  setBlogID: React.Dispatch<React.SetStateAction<string>>;
};

// BlogTableContext gets passed two parameters, tableState and setTableState
// the types for both of these need to be accounted for which is why I declare their types
export const BlogTableContext = createContext<BlogTableContextType | null>(
  null
);
export const BlogViewContext = createContext<BlogViewContextType | null>(null);
export const BlogIDContext = createContext<BlogIDContextType | null>(null);

const MotionBlogTable = motion.create(BlogTable);

function App() {
  const [tableState, setTableState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);
  const [blogID, setBlogID] = useState<string>("");

  return (
    <BlogTableContext.Provider value={{ tableState, setTableState }}>
      <BlogViewContext.Provider value={{ viewState, setViewState }}>
        <BlogIDContext.Provider value={{ blogID, setBlogID }}>
          <div className="flex gap-6">
            <MotionBlogTable initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <BlogTable></BlogTable>
            {/* <BlogAdd></BlogAdd>
            <BlogView></BlogView> */}
          </div>
        </BlogIDContext.Provider>
      </BlogViewContext.Provider>
    </BlogTableContext.Provider>
  );
}

export default App;
