import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { BlogTableContext } from "./App";

export function BlogView() {
  const blogTableContext = useContext(BlogTableContext);

  // check to see if null -> by doing this, typescript will not complain!
  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  // first, on click of blog, send blog id to this component
  // then once that click is made, take blog id and perform a get request with the specific id
  // store data in variable and extract it in the component to view title, date and content

  const { setTableState } = blogTableContext;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [blogInfo, setBlogInfo] = useState({
    title: "",
    content: "",
  });

  //   setFormError({
  //     ...formError,
  //     invalidEmail: {
  //       ...formError.invalidEmail,
  //       hasError: true,
  //     },

  const handlePublish = () => {
    const blogInfo = { title, content };

    fetch("http://localhost:3000/api/blog/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogInfo),
    })
      .then((response) => {
        if (response.status === 201) {
          setTableState(true);
          setTitle("");
          setContent("");
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
        <h1 className="text-left px-2 text-3xl font-bold text-totalblue mb-4"></h1>
      </div>
      <div className="px-2 text-totalblue flex flex-col gap-3">
        <div className="text-left flex flex-col gap-2">
          <Label htmlFor="message">INSERT DATE</Label>
        </div>
        <div className="text-left flex flex-col gap-2">
          <p>HELLO HELLO HELLO</p>
        </div>
      </div>
    </Card>
  );
}

export default BlogView;
