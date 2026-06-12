"use client";

import {
  BenefitsSection,
  HeroSection,
  LandingHeader,
  MissionSection,
  StepsSection,
} from "@/04.widgets";
import { Geist } from "next/font/google";

const GEIST = Geist({ subsets: ["latin"] });

const DesignView = () => {
  return (
    <div className={`${GEIST.className} relative bg-[#fefefe]`}>
      <LandingHeader />
      <main>
        <HeroSection />
        <MissionSection />
        <StepsSection />
        <BenefitsSection />
      </main>
    </div>
  );
};

export default DesignView;
