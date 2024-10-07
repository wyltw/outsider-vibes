import { auth } from "@/auth";
import CustomError from "@/components/custom-error";
import UserCollectionWrapper from "@/components/user-collection-wrapper";
import Image from "next/image";
import React, { ReactNode } from "react";

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
      <h1 className="mb-4 text-3xl font-medium text-primary">精選收藏</h1>
      <Section>
        <SecondHeading>專輯收藏</SecondHeading>
        <UserCollectionWrapper type="release" context="main" />
      </Section>
      <Section>
        <SecondHeading>藝人收藏</SecondHeading>
        <UserCollectionWrapper type="artist" context="main" />
      </Section>
    </>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section> {children} </section>;
}

function SecondHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-medium text-primary">{children}</h2>;
}
