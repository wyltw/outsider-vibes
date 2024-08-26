import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header page="home" />
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* 使欄位空間最小可為0，如此一來窗口縮小的時候，column不會受到fr最小尺寸受內容大小限制的影響。 */}
        <Sidebar />
        <main className="col-span-1 mx-auto h-[calc(100vh_-_80px)] w-full max-w-5xl px-4 py-8 lg:col-start-2">
          {children}
        </main>
      </div>
    </>
  );
}
