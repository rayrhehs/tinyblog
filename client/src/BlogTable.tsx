import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useContext } from "react";
import { BlogTableContext } from "./App";

export function BlogTable() {
  // blog object types
  type BlogType = {
    number: string;
    title: string;
    date: string;
  };

  // save in variable then...
  const blogTableContext = useContext(BlogTableContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  const { tableState, setTableState } = blogTableContext;

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blog/home", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json(); // lets us access only the response jsons we want
      })
      .then((data) => {
        setBlog(data);
        setTableState(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation.", error);
      });
  }, [tableState, setTableState]);

  return (
    <Card>
      <div className="flex justify-between content-end text-totalblue mb-2">
        <h1 className="px-4 text-3xl font-bold">Personal Blog</h1>
        <Button className="text-xl font-bold pb-0 items-start" variant="link">
          +Add
        </Button>
      </div>
      <Table>
        <ScrollArea className="h-60 rounded-md">
          <TableBody>
            {blog.map((blog: BlogType) => (
              <TableRow key={blog.number}>
                <TableCell>
                  <Button className="font-bold text-base p-0" variant="link">
                    {blog.title}
                  </Button>
                </TableCell>
                <TableCell className="flex text-right items-center">
                  {blog.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </Card>
  );
}

export default BlogTable;
