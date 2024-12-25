import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./components/ui/button";
import { useContext, useState } from "react";
import { BlogTableContext, BlogAddModalContext } from "./App";
import { motion } from "motion/react";

const MAX_CHARS = 250;

export const BlogAdd = motion(function BlogAdd() {
  // add this in during home button
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

  const { setTableState } = blogTableContext;
  const { setAddOpen } = blogAddModalContext;
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  const updateBlogTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogData({
      ...blogData,
      title: e.target.value,
    });
  };

  const updateBlogContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setBlogData({
        ...blogData,
        content: newText,
      });
    }
  };

  const remainingChars = MAX_CHARS - blogData.content.length;

  const handlePublish = () => {
    const submitBlogData = { title: blogData.title, content: blogData.content };
    setAddOpen(false);

    fetch("http://localhost:3000/api/blog/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitBlogData),
    })
      .then((response) => {
        if (response.status === 201) {
          setTableState(true);
          // updates entire object rather than multiple useStates
          setBlogData({ title: "", content: "" });
          console.log("New entry ereated!");
        }
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

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
            New Blog
          </h1>
        </div>
        <div className="px-2 text-totalblue flex flex-col gap-3">
          <div className="text-left flex flex-col gap-2">
            <Label htmlFor="message">Title</Label>
            <Textarea
              placeholder="Write your title here."
              className="flex min-h-[45px] h-[45px] resize-none px-4"
              id="message"
              value={blogData.title}
              onChange={updateBlogTitle}
              maxLength={30}
            />
          </div>
          <div className="text-left flex flex-col gap-2">
            <Label htmlFor="message">Content</Label>
            <Textarea
              placeholder="Write your blog here."
              className="flex h-64 resize-none p-4"
              id="message"
              value={blogData.content}
              onChange={updateBlogContent}
              maxLength={MAX_CHARS}
            />
          </div>
        </div>
        <div className="px-2 py-4 flex justify-end gap-x-3">
          <Label className="text-totalblue text-md font-semibold self-center">
            {remainingChars}
          </Label>
          <Button variant="outline" onClick={handlePublish}>
            <b>Publish</b>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogAdd;
