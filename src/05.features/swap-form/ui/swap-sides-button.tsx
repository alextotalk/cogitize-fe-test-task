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
      <div className="h-px w-full bg-[#e7e7e7]" />
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: spins * 180 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        aria-label={label}
        className="absolute right-0 grid h-11 w-11 place-items-center rounded-full bg-[#272727] transition-colors hover:bg-[#323232]"
      >
        <ArrowDownUp className="h-5 w-5 text-[#05d533]" />
      </motion.button>
    </div>
  );
};

export default SwapSidesButton;
