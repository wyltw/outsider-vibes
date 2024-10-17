import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ResultsListContextProvider from "@/contexts/ResultsListContextProvider";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header page="home" />
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* 使欄位空間最小可為0，如此一來窗口縮小的時候，column不會受到fr最小尺寸受內容大小限制的影響。針對collapse組件的解決方案 */}
        <Sidebar />
        <main className="col-span-1 mx-auto w-full max-w-5xl place-items-center px-4 py-8 lg:col-start-2">
          {/* 與sidebar不同，sidebar因為position fixed脫離文檔流，需要使用h-[calc(100vh_-_80px)]佔據起始之後的高度填滿窗口，但是對於main是沒有必要的，因為postion sticky的header會將main自然下推，而main只需要隨內容多寡決定自動觸發scrollbar就可以了 */}
          <ResultsListContextProvider>{children}</ResultsListContextProvider>
          {/* 這裡注意provider的範圍還是需要以Page為主，目前經測試包含Header會觸發錯誤 */}
        </main>
      </div>
    </>
  );
}
