import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useEffect, useState } from "react";
import { BlogIDContext } from "./App";
import { motion } from "motion/react";

export const BlogView = motion(function BlogView() {
  // blog object types
  type BlogType = {
    // question mark means its optional AKA it can wait to be populated later
    title?: string;
    date?: string;
    content?: string;
  };

  const blogIDContext = useContext(BlogIDContext);

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  const { blogID, setBlogID } = blogIDContext;

  const [blogData, setBlogData] = useState<BlogType>({});

  //   setFormError({
  //     ...formError,
  //     invalidEmail: {
  //       ...formError.invalidEmail,
  //       hasError: true,
  //     },

  const handleView = () => {
    fetch(`http://localhost:3000/api/blog/${blogID}`, {
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
        console.log(data);
        setBlogData(data);
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  useEffect(() => {
    handleView();
  }, [blogID, setBlogID]);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 1, filter: "blur(0px)" }}
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ x: "100%", opacity: 0, filter: "blur(1px)" }} // Blur while fading out
      transition={{
        x: { duration: 0.35 },
        opacity: { duration: 0.7 },
        filter: { duration: 0.5 },
      }}
      className={"absolute"}
    >
      <Card className="px-4">
        <div>
          <h1 className="text-left px-2 text-3xl font-bold text-totalblue mb-4">
            {blogData.title}
          </h1>
        </div>
        <div className="px-2 text-totalblue flex flex-col gap-3 h-72">
          <div className="text-left flex flex-col gap-2">
            <Label htmlFor="message">{blogData.date}</Label>
          </div>
          <ScrollArea className="h-max rounded-md">
            <div className="text-left flex flex-col gap-2">
              <p>{blogData.content}</p>
            </div>
          </ScrollArea>
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogView;
