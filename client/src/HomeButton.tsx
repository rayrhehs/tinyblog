import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { BlogViewModalContext } from "./App";
import { motion } from "motion/react";
import UpArrow from "./assets/chevron-square-up.svg";

export const HomeButton = motion(function HomeButton() {
  const viewOpenContext = useContext(BlogViewModalContext);

  if (!viewOpenContext) {
    throw new Error(
      "BlogViewOpenContext must be used within a BlogViewOpenContext.Provider"
    );
  }

  const { setViewOpen } = viewOpenContext;
  const handleHomeClick = () => {
    setViewOpen(false);
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1, scale: 0.6 }} // Start off-screen and smaller
      animate={{ y: 0, opacity: 1, scale: 1 }} // Scale up to normal size when mounting
      exit={{ x: 0, opacity: 1, scale: 0.6 }} // Scale down when exiting
      transition={{
        type: "linear",
        stiffness: 50,
        damping: 10,
        x: { duration: 0.35 }, // Slide duration
        opacity: { duration: 1 }, // Fade duration
        scale: { duration: 0.35, delay: 0.5 }, // Scale duration
      }} // Smooth spring-like motion for sliding and fading
    >
      <Button
        onClick={handleHomeClick}
        variant={"outline"}
        className="px-2 rounded-small mb-4"
      >
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
      </Button>
    </motion.div>
  );
});

export default HomeButton;
