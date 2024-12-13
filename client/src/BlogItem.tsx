import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { BlogIDContext } from "./App";

// declare types of props
type BlogProps = {
  idNumber: string;
  title: string;
  date: string;
};

// use BlogProps to define types
export function Blog({ idNumber, title, date }: BlogProps) {
  const blogIDContext = useContext(BlogIDContext);

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  const { setBlogID } = blogIDContext;
  const handleBlogClick = () => {
    setBlogID(idNumber);
  };

  // on clicking the button, we update blogIDContext
  // the blogView useEffect monitors blogIDContext and if it changes, runs the route to get blog info

  return (
    <TableRow key={idNumber}>
      <TableCell>
        <Button
          className="font-bold text-base p-0"
          variant="link"
          onClick={handleBlogClick}
        >
          {title}
        </Button>
      </TableCell>
      <TableCell className="flex text-right items-center">{date}</TableCell>
    </TableRow>
  );
}

export default Blog;
