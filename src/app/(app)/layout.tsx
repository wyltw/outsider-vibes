import HomeHeader from "@/components/home-page/home-header";
import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="col-start-2 col-end-3 mx-auto h-[calc(100vh_-_80px)] w-full max-w-5xl px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
}
