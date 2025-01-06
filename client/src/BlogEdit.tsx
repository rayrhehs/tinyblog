import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./components/ui/button";
import { useContext, useState, useEffect } from "react";
import { BlogTableContext, EditModeContext, BlogIDContext } from "./App";
import { motion } from "motion/react";

const MAX_CHARS = 250;

export const BlogEdit = motion(function BlogEdit() {
  // add this in during home button
  const blogTableContext = useContext(BlogTableContext);
  const editModeContext = useContext(EditModeContext);
  const blogIDContext = useContext(BlogIDContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  if (!editModeContext) {
    throw new Error(
      "EditModeContext must be used within an EditModeContext.Provider"
    );
  }

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  const { blogID } = blogIDContext;
  const { setTableState } = blogTableContext;
  const { setEditMode } = editModeContext;

  const [blogData, setBlogData] = useState({
    title: "",
    date: "",
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

  const handleSubmitEdit = () => {
    setEditMode(false);
    const submitUpdatedBlogData = {
      title: blogData.title,
      date: blogData.date,
      content: blogData.content,
    };

    fetch(`http://localhost:3000/api/blog/${blogID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitUpdatedBlogData),
    })
      .then((response) => {
        if (response.status === 200) {
          setTableState(true);
          // updates entire object rather than multiple useStates
          setBlogData({ title: "", date: "", content: "" });
          console.log("Entry has been updated!");
        }
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

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
        setBlogData(data);
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  useEffect(() => {
    handleView();
  }, []);

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
            Edit Blog
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
          <Button variant="outline" onClick={handleSubmitEdit}>
            <b>Done</b>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
});

export default BlogEdit;
