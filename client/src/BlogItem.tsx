import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AdminModeContext, BlogIDContext, BlogViewModalContext } from "./App";
import BlogItemButtons from "./BlogItemButtons";

// declare types of props
type BlogProps = {
  idNumber: string;
  title: string;
  date: string;
};

// use BlogProps to define types
export function Blog({ idNumber, title, date }: BlogProps) {
  const blogIDContext = useContext(BlogIDContext);
  const viewOpenContext = useContext(BlogViewModalContext);
  const adminModeContext = useContext(AdminModeContext);

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  if (!viewOpenContext) {
    throw new Error(
      "BlogViewOpenContext must be used within a BlogViewOpenContext.Provider"
    );
  }

  if (!adminModeContext) {
    throw new Error(
      "AdminModeContext must be used within a AdminModeContext.Provider"
    );
  }

  const { setBlogID } = blogIDContext;
  const { setViewOpen } = viewOpenContext;
  const handleBlogClick = () => {
    setBlogID(idNumber);
    setViewOpen(true);
  };
  const { adminMode } = adminModeContext;

  // on clicking the button, we update blogIDContext
  // the blogView useEffect monitors blogIDContext and if it changes, runs the route to get blog info

  return (
    <TableRow
      key={idNumber}
      className="w-full flex justify-between items-center p-0"
    >
      <TableCell className="pl-2 max-w-60 overflow-hidden">
        <Button
          className={
            title.length > 20
              ? "font-bold text-xl p-0 transition-transform duration-500 hover:-translate-x-8"
              : "font-bold text-xl p-0"
          }
          variant="link"
          onClick={handleBlogClick}
        >
          {title}
        </Button>
      </TableCell>
      <TableCell className="flex text-right text-xl items-center">
        {adminMode ? (
          <BlogItemButtons blogID={idNumber}></BlogItemButtons>
        ) : (
          date
        )}
      </TableCell>
    </TableRow>
  );
}

export default Blog;
