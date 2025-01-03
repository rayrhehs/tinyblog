import { useContext } from "react";
import { BlogIDContext, BlogTableContext, EditModeContext } from "./App";
import { Button } from "./components/ui/button";

function BlogItemButtons({ blogIDCurrent }: { blogIDCurrent: string }) {
  const blogTableContext = useContext(BlogTableContext);
  const editModeContext = useContext(EditModeContext);
  const blogIDContext = useContext(BlogIDContext);

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

  const { setBlogID } = blogIDContext;
  const { setTableState } = blogTableContext;
  const { setEditMode } = editModeContext;

  const handleEditButton = () => {
    setEditMode(true);
    setBlogID(blogIDCurrent);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/blog/${blogIDCurrent}`, {
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
      <Button
        className="font-base text-xl hover:underline"
        onClick={handleEditButton}
      >
        Edit
      </Button>
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
