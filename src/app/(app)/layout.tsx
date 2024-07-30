import HomeHeader from "@/components/home-page/home-header";
import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeHeader />
      <div className="grid grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="container col-start-2 col-end-3 h-[calc(100vh_-_80px)] py-8">
          {children}
        </main>
      </div>
    </>
  );
}
