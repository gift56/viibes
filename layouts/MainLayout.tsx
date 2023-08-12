import { LeftSideBar, RightSidebar } from "@/components";
import Head from "next/head";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showRight: boolean;
  pageTitle: string;
}

const MainLayout = ({ children, pageTitle, showRight }: LayoutProps) => {
  return (
    <main className="xl:w-[1200px] m-auto overflow-hidden h-screen flex items-start justify-between flex-col lg:flex-row">
      <div className="lg:flex-[1] w-full border-b lg:border-none">
        <LeftSideBar />
      </div>
      <div className="lg:flex-[2] w-full h-screen overflow-y-auto scrollbar-hide">
        {children}
      </div>
      {showRight === true && (
        <div className="lg:flex-[1] hidden lg:flex">
          <RightSidebar />
        </div>
      )}
    </main>
  );
};

export default MainLayout;
