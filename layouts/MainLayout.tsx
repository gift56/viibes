import { LeftSideBar, RightSidebar } from "@/components";
import Head from "next/head";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showRight: boolean;
  pageTitle: string;
}
// Expore the fun in video sharing and Have a happy life

const MainLayout = ({ children, pageTitle, showRight }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`Viibes - ${pageTitle}`}</title>
        <meta
          name="description"
          content="Expore the fun in video sharing and Have a happy life"
        />
      </Head>
      <main className="xl:w-[1200px] m-auto overflow-hidden h-screen flex items-start justify-between flex-col lg:flex-row">
        <div className="lg:flex-[1] w-full border-b lg:border-none">
          <LeftSideBar />
        </div>
        {showRight === true && (
          <div className="lg:flex-[1] hidden lg:flex">
            <RightSidebar />
          </div>
        )}
      </main>
    </>
  );
};

export default MainLayout;
