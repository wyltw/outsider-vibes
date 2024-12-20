import React, { ReactNode } from "react";
import RouteList from "../route-list";
import { featuredGenres } from "@/lib/constants";
import Copyright from "../landing-page/copyright";
import SignIn from "../sign-in";
import { auth } from "@/auth";
import UserAvatar from "../collection-page/user-avatar";
import UserCollectionWrapper from "../collection-page/user-collection-wrapper";

export default async function Sidebar() {
  let userData;
  const session = await auth();
  if (session?.user) {
    userData = session.user;
  }
  //Sidebar實際上因為條件渲染精選風格和用戶收藏所以保持了動態渲染
  return (
    <aside className="fixed left-0 top-[80px] z-50 col-span-1 mt-px hidden h-[calc(100vh_-_80px)] w-72 flex-col gap-y-4 overflow-y-auto bg-white px-4 py-8 shadow lg:flex">
      {/* 即使因為文檔流aside可以自然下推，顯式的設定top-[80px]設定起始點會使目的更加明確 */}
      <SidebarSection>
        <ThirdHeading>個人資料</ThirdHeading>
        <div className="flex flex-col items-center gap-y-4">
          <UserAvatar width={64} height={64} context={"sidebar"} />
          <SignIn context="sidebar" />
          {userData ? (
            <p className="text-center text-sm text-black/50">
              歡迎回來，{userData.name}
            </p>
          ) : (
            <p className="text-center text-sm text-black/50">登入以添加收藏</p>
          )}
        </div>
      </SidebarSection>
      {userData ? null : (
        <SidebarSection>
          <ThirdHeading>精選風格</ThirdHeading>
          <RouteList context="sidebar" routes={featuredGenres} />
        </SidebarSection>
      )}

      <SidebarSection>
        <ThirdHeading>專輯收藏</ThirdHeading>
        <UserCollectionWrapper type="release" context="sidebar" />
      </SidebarSection>
      <SidebarSection>
        <ThirdHeading>藝人收藏</ThirdHeading>
        <UserCollectionWrapper type="artist" context="sidebar" />
      </SidebarSection>
      <Copyright className="mt-auto" />
    </aside>
  );
}

function SidebarSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center rounded-md border-b border-slate-200 bg-white p-4 shadow">
      {children}
    </section>
  );
}

function ThirdHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 self-start text-xl font-medium text-primary">
      {children}
    </h3>
  );
}
