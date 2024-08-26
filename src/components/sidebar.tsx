import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import RouteList from "./route-list";
import { featuredGenres } from "@/lib/constants";
import Copyright from "./copyright";

export default function Sidebar() {
  return (
    <aside className="fixed top-[80px] mt-[1px] hidden h-[calc(100vh_-_80px)] flex-col gap-y-4 overflow-y-auto bg-white px-4 py-8 shadow lg:flex">
      <SidebarSection>
        <ThirdHeading>個人資料</ThirdHeading>
        <div className="h-16 w-16 rounded-full bg-slate-200"></div>
        <Button size="sm">登入</Button>
        <p className="text-center text-sm text-black/50">登入以添加收藏</p>
      </SidebarSection>
      <SidebarSection>
        <ThirdHeading>精選風格</ThirdHeading>
        <RouteList context="sidebar" routes={featuredGenres} />
      </SidebarSection>
      <SidebarSection>
        <ThirdHeading>藝人收藏</ThirdHeading>
        <ul>
          <li>目前沒有任何收藏</li>
        </ul>
      </SidebarSection>
      <SidebarSection>
        <ThirdHeading>專輯收藏</ThirdHeading>
        <ul>
          <li>目前沒有任何收藏</li>
        </ul>
      </SidebarSection>
      <Copyright className="mt-auto" />
    </aside>
  );
}

export function SidebarSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-y-4 rounded-md border-b border-slate-200 bg-white p-4 shadow">
      {children}
    </section>
  );
}

export function ThirdHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="self-start text-xl font-medium text-primary">{children}</h3>
  );
}
