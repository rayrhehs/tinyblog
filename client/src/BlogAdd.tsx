import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./components/ui/button";
import { useContext, useState } from "react";
import { BlogTableContext } from "./App";

export function BlogAdd() {
  const blogTableContext = useContext(BlogTableContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  const { setTableState } = blogTableContext;
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
    setBlogData({
      ...blogData,
      content: e.target.value,
    });
  };

  const handlePublish = () => {
    const submitBlogData = { title: blogData.title, content: blogData.content };

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
            className="flex min-h-[45px] h-[45px] max-h-[145px]"
            id="message"
            value={blogData.title}
            onChange={updateBlogTitle}
          />
        </div>
        <div className="text-left flex flex-col gap-2">
          <Label htmlFor="message">Content</Label>
          <Textarea
            placeholder="Write your blog here."
            className="flex max-h-[145px]"
            id="message"
            value={blogData.content}
            onChange={updateBlogContent}
          />
        </div>
      </div>
      <div className="px-2 py-4 flex justify-start">
        <Button variant="outline" onClick={handlePublish}>
          <b>Publish</b>
        </Button>
      </div>
    </Card>
  );
}

export default BlogAdd;
