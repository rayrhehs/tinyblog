import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { BlogIDContext } from "./App";

export function BlogView() {
  const blogIDContext = useContext(BlogIDContext);

  if (!blogIDContext) {
    throw new Error(
      "BlogIDContext must be used within a BlogIDContext.Provider"
    );
  }

  const { blogID, setBlogID } = blogIDContext;

  const [blogData, setBlogData] = useState({});

  //   setFormError({
  //     ...formError,
  //     invalidEmail: {
  //       ...formError.invalidEmail,
  //       hasError: true,
  //     },

  const handlePublish = () => {
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
        setBlogData({ ...data });
      })
      .catch((err) => {
        console.log(`This is the ERROR: ${err}`);
      });
  };

  useEffect(() => {}, [blogID, setBlogID]);

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
