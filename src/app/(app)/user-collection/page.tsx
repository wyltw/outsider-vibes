import { auth } from "@/auth";
import CustomError from "@/components/custom-error";
import React from "react";

export default async function UserCollectionPage() {
  const session = await auth();
  if (!session?.user) {
    return <CustomError error="請先登入後再查看收藏" />;
  }
  return (
    <>
      <div>UserCollectionPage</div>
    </>
  );
}
