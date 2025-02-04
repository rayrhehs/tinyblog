import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useContext } from "react";
import { BlogTableContext, BlogAddModalContext } from "./App";
import Blog from "./BlogItem";
import { motion } from "motion/react";
import useScrollBottom from "./hooks/useScrollBottom";

type AdminModeType = {
  adminMode: boolean;
};

// blog object types
type BlogType = {
  _id: string;
  title: string;
  date: string;
};

export const BlogTable = motion(function BlogTable({
  adminMode,
}: AdminModeType) {
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

  const isBottom = useScrollBottom(20); // 20px threshold

  return (
    <motion.div
      initial={{ x: 0, opacity: 1, scale: 0.8 }} // Start off-screen and smaller
      animate={{ x: 0, opacity: 1, scale: 1 }} // Scale up to normal size when mounting
      exit={{ x: 0, opacity: 1, scale: 0.8 }} // Scale down when exiting
      transition={{
        type: "linear",
        stiffness: 50,
        damping: 10,
        x: { duration: 0.35 }, // Slide duration
        opacity: { duration: 1 }, // Fade duration
        scale: { duration: 0.35, delay: 0.5 }, // Scale duration
      }} // Smooth spring-like motion for sliding and fading
    >
      <Card className="px-4" variant={adminMode ? "inverse" : "default"}>
        <div
          className={
            adminMode
              ? "flex justify-between content-end text-white mb-2"
              : "flex justify-between content-end text-totalblue mb-2"
          }
        >
          <h1 className="px-2 text-3xl font-bold">Personal Blog</h1>
          <Button
            className="text-xl font-bold pb-0 items-start"
            variant="link"
            onClick={handleAddClick}
          >
            +Add
          </Button>
        </div>
        <div className="relative w-full h-104 rounded-md">
          <ScrollArea className="w-full h-full">
            <Table
              className="w-full px-0"
              variant={adminMode ? "inverse" : "default"}
            >
              <TableBody>
                {blog.map((blog: BlogType) => (
                  <Blog
                    idNumber={blog._id}
                    title={blog.title}
                    date={blog.date}
                  ></Blog>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          {!isBottom && !adminMode ? (
            <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent"></div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogTable;
