import { SectionCards } from "@/components/section-cards";
import React from "react";

const DahboardPage = () => {
  return (
    <>
      <h1 className="text-xl font-semibold">Welcome to Dashboard</h1>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default DahboardPage;
