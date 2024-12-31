import { useContext } from "react";
import { BlogTableContext } from "./App";
import { Button } from "./components/ui/button";

function BlogItemButtons({ blogID }: { blogID: string }) {
  const blogTableContext = useContext(BlogTableContext);

  if (!blogTableContext) {
    throw new Error(
      "BlogTableContext must be used within a BlogTableContext.Provider"
    );
  }

  const { setTableState } = blogTableContext;

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/blog/${blogID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        setTableState(true);
        return;
      })
      .catch((err) => {
        console.log(`This is the error: ${err}`);
      });
  };

  return (
    <>
      <Button className="font-base text-xl hover:underline">Edit</Button>
      <Button
        className="font-base text-xl hover:underline"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </>
  );
}

export default BlogItemButtons;
