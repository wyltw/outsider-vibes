import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type UserAvatarProps = {
  context: "sidebar" | "header";
  width: number;
  height: number;
};

export default async function UserAvatar({
  context,
  width,
  height,
}: UserAvatarProps) {
  let userData;
  const session = await auth();
  if (session?.user) {
    userData = session.user;
  }
  return (
    <>
      {userData ? (
        <Image
          className="rounded-full"
          alt="user avatar"
          width={width}
          height={height}
          src={userData.image || ""}
        />
      ) : (
        <div
          className={cn(
            "rounded-full bg-slate-200",
            context === "sidebar" && "h-16 w-16",
            context === "header" && "h-12 w-12",
          )}
        ></div>
      )}
    </>
  );
}
