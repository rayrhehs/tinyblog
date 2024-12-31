import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AdminModeContext } from "./App";
import { motion } from "motion/react";

export const AdminButton = motion(function AdminButton() {
  const adminModeContext = useContext(AdminModeContext);

  if (!adminModeContext) {
    throw new Error(
      "AdminModeContext must be used within a AdminModeContext.Provider"
    );
  }

  const { adminMode, setAdminMode } = adminModeContext;
  const handleAdminModeClick = () => {
    setAdminMode((prevAdminMode) => !prevAdminMode);
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
        onClick={handleAdminModeClick}
        variant={adminMode ? "outlineInverse" : "outline"}
        className="px-2 rounded-small mt-4"
      >
        <p className="text-base font-medium">
          {adminMode ? "Admin Mode: ON" : "Admin Mode: OFF"}
        </p>
      </Button>
    </motion.div>
  );
});

export default AdminButton;
