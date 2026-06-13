"use client";

import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface SwapSidesButtonProps {
  onClick: () => void;
  label: string;
}

const SwapSidesButton = ({ onClick, label }: SwapSidesButtonProps) => {
  const [spins, setSpins] = useState(0);

  const handleClick = () => {
    setSpins((count) => count + 1);
    onClick();
  };

  return (
    <div className="relative flex h-11 items-center">
      <div className="h-px w-full bg-hairline-light" />
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: spins * 180 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-label={label}
        // 20px inset from the right edge, matching Figma (left:316 in a 380 frame)
        style={{ right: "20px" }}
        className="absolute grid h-11 w-11 place-items-center rounded-full bg-surface-raised transition-colors hover:bg-surface-hover"
      >
        <ArrowDownUp className="h-6 w-6 text-brand" />
      </motion.button>
    </div>
  );
};

export default SwapSidesButton;
