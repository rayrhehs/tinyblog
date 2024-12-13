import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useContext } from "react";
import { BlogTableContext, BlogAddModalContext } from "./App";
import Blog from "./BlogItem";
import { motion } from "motion/react";

export const BlogTable = motion(function BlogTable() {
  // blog object types
  type BlogType = {
    _id: string;
    title: string;
    date: string;
  };

  // save in variable then...
  // this will be moved to a master component
  const blogTableContext = useContext(BlogTableContext);
  const blogAddModalContext = useContext(BlogAddModalContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogAddModalContext) {
    throw new Error(
      "BlogAddModalContext must be used within a BlogAddModalContext.Provider"
    );
  }

  const { tableState, setTableState } = blogTableContext;
  const { setAddOpen } = blogAddModalContext;

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

  const handleAddClick = () => {
    setAddOpen(true);
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
      animate={{ x: 0, opacity: 1 }} // Slide into position
      exit={{ x: "100%", opacity: 0 }} // Slide out to the right when unmounting
      transition={{ type: "linear", stiffness: 50, damping: 10 }} // Smooth spring-like motion
    >
      <Card className="px-4">
        <div className="flex justify-between content-end text-totalblue mb-2">
          <h1 className="px-2 text-3xl font-bold">Personal Blog</h1>
          <Button
            className="text-xl font-bold pb-0 items-start"
            variant="link"
            onClick={handleAddClick}
          >
            +Add
          </Button>
        </div>
        <Table className="px-0">
          <ScrollArea className="h-60 rounded-md">
            <TableBody>
              {blog.map((blog: BlogType) => (
                <Blog
                  idNumber={blog._id}
                  title={blog.title}
                  date={blog.date}
                ></Blog>
              ))}
            </TableBody>
          </ScrollArea>
        </Table>
      </Card>
    </motion.div>
  );
});

export default BlogTable;
