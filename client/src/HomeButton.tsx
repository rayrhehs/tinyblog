import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { BlogViewModalContext } from "./App";
import { motion } from "motion/react";

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

  return <Button onClick={handleHomeClick}>HOME</Button>;
});

export default HomeButton;
