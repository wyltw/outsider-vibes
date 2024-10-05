import { auth } from "@/auth";
import CustomError from "@/components/custom-error";
import Image from "next/image";
import React from "react";

export default async function UserCollectionPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <>
        <CustomError error="請先登入後再查看收藏" />
        <Image
          className="me-auto ms-auto"
          width={560}
          height={560}
          alt="authentication"
          src={"/images/authentication-pana.svg"}
        />
      </>
    );
  }
  return (
    <>
      <div>UserCollectionPage</div>
    </>
  );
}
