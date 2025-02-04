import { createContext, useState } from "react";
import BlogTable from "./BlogTable.tsx";
import BlogAdd from "./BlogAdd.tsx";
import BlogEdit from "./BlogEdit.tsx";
import BlogView from "./BlogView.tsx";
import HomeButton from "./HomeButton.tsx";
import AdminButton from "./AdminButton.tsx";
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

type BlogViewModalContextType = {
  viewOpen: boolean;
  setViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type AdminModeContextType = {
  adminMode: boolean;
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditModeContextType = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
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

export const BlogViewModalContext =
  createContext<BlogViewModalContextType | null>(null);

export const AdminModeContext = createContext<AdminModeContextType | null>(
  null
);

export const EditModeContext = createContext<EditModeContextType | null>(null);

function App() {
  const [tableState, setTableState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);
  const [blogID, setBlogID] = useState<string>("");
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
        <BlogViewModalContext.Provider value={{ viewOpen, setViewOpen }}>
          <BlogAddModalContext.Provider value={{ addOpen, setAddOpen }}>
            <BlogTableContext.Provider value={{ tableState, setTableState }}>
              <BlogViewContext.Provider value={{ viewState, setViewState }}>
                <BlogIDContext.Provider value={{ blogID, setBlogID }}>
                  <div
                    className={
                      adminMode
                        ? "min-h-screen flex flex-col items-center justify-center bg-totalblue"
                        : "min-h-screen flex flex-col items-center justify-center" // this code block adds and changes the background element/color
                    }
                  >
                    {addOpen || editMode || viewOpen ? (
                      <HomeButton adminMode={adminMode}></HomeButton>
                    ) : (
                      <div className="px-2 py-4 mb-6"></div> // divider to fill out space where the button is supposed to be
                    )}
                    <div className="flex flex-col gap-6">
                      <BlogTable adminMode={adminMode}></BlogTable>
                      <AnimatePresence>
                        {addOpen ? (
                          <BlogAdd adminMode={adminMode}></BlogAdd>
                        ) : null}
                        {editMode ? (
                          <BlogEdit adminMode={adminMode}></BlogEdit>
                        ) : null}
                        {viewOpen ? (
                          <BlogView adminMode={adminMode}></BlogView>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <AdminButton></AdminButton>
                  </div>
                </BlogIDContext.Provider>
              </BlogViewContext.Provider>
            </BlogTableContext.Provider>
          </BlogAddModalContext.Provider>
        </BlogViewModalContext.Provider>
      </AdminModeContext.Provider>
    </EditModeContext.Provider>
  );
}

export default App;
