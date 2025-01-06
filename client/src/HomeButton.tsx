import { Button } from "@/components/ui/button";
import { useContext } from "react";
import {
  BlogAddModalContext,
  BlogViewModalContext,
  EditModeContext,
} from "./App";
import { motion } from "motion/react";

type AdminModeType = {
  adminMode: boolean;
};

export const HomeButton = motion(function HomeButton({
  adminMode,
}: AdminModeType) {
  const blogAddModalContext = useContext(BlogAddModalContext);
  const editModeContext = useContext(EditModeContext);
  const viewOpenContext = useContext(BlogViewModalContext);

  if (!viewOpenContext) {
    throw new Error(
      "BlogViewOpenContext must be used within a BlogViewOpenContext.Provider"
    );
  }

  if (!blogAddModalContext) {
    throw new Error(
      "BlogAddModalContext must be used within a BlogAddModalContext.Provider"
    );
  }

  if (!editModeContext) {
    throw new Error(
      "EditModeContext must be used within an EditModeContext.Provider"
    );
  }

  const { editMode, setEditMode } = editModeContext;
  const { addOpen, setAddOpen } = blogAddModalContext;
  const { setViewOpen } = viewOpenContext;

  const handleHomeClick = () => {
    setViewOpen(false);
    setEditMode(false);
    setAddOpen(false);
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 0.5, scale: 1 }} // Start off-screen and smaller
      animate={{ y: 0, opacity: 1, scale: 1 }} // Scale up to normal size when mounting
      exit={{ x: 0, opacity: 1, scale: 0.6 }} // Scale down when exiting
      transition={{
        type: "linear",
        stiffness: 50,
        damping: 10,
        x: { duration: 0.35 }, // Slide duration
        opacity: { duration: 0.25 }, // Fade duration
      }} // Smooth spring-like motion for sliding and fading
    >
      <Button
        onClick={handleHomeClick}
        variant={adminMode ? "outlineInverse" : "outline"}
        className="w-20 rounded-small mb-4"
      >
        {addOpen || editMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-6 -6 24 24"
            width="28"
            fill="currentColor"
          >
            <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        )}
      </Button>
    </motion.div>
  );
});

export default HomeButton;
