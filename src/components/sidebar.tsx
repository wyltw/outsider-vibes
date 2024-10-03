import React, { ReactNode } from "react";
import RouteList from "./route-list";
import { featuredGenres } from "@/lib/constants";
import Copyright from "./copyright";
import SignIn from "./sign-in";
import { auth } from "@/auth";
import Image from "next/image";
import UserCollection from "./user-collection";

export default async function Sidebar() {
  let userData;
  const session = await auth();
  if (session?.user) {
    userData = session.user;
  }
  return (
    <aside className="fixed left-0 top-[80px] z-50 col-span-1 mt-[1px] hidden h-[calc(100vh_-_80px)] w-72 flex-col gap-y-4 overflow-y-auto bg-white px-4 py-8 shadow lg:flex">
      <SidebarSection>
        <ThirdHeading>個人資料</ThirdHeading>
        <div className="flex flex-col items-center gap-y-4">
          {userData ? (
            <Image
              className="rounded-full"
              alt="user avatar"
              width={64}
              height={64}
              src={userData.image || ""}
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-slate-200"></div>
          )}
          <SignIn />
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
        <UserCollection type="release" />
      </SidebarSection>
      <SidebarSection>
        <ThirdHeading>藝人收藏</ThirdHeading>
        <UserCollection type="artist" />
      </SidebarSection>
      <Copyright className="mt-auto" />
    </aside>
  );
}

export function SidebarSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center rounded-md border-b border-slate-200 bg-white p-4 shadow">
      {children}
    </section>
  );
}

export function ThirdHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 self-start text-xl font-medium text-primary">
      {children}
    </h3>
  );
}
