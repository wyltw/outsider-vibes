import { auth } from "@/auth";
import CardLoading from "@/components/card-loading";
import CustomError from "@/components/custom-error";
import UserCollectionWrapper from "@/components/collection-page/user-collection-wrapper";
import Image from "next/image";
import authenticationPana from "/public/images/authentication-pana.svg";
import React, { ReactNode, Suspense } from "react";

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
          src={authenticationPana}
        />
      </>
    );
  }
  return (
    <>
      <h1 className="mb-2 text-3xl font-medium text-primary">收藏夹</h1>
      <p className="text-black/50">
        未來，我們計畫逐步串接 Spotify
        API，讓您可以直接將心儀的專輯或藝術家添加至您的 Spotify 清單中。
      </p>
      <p className="text-black/50">
        目前由於 Discogs API
        的請求頻率限制，我們暫時設置了一個收藏上限，感謝您的理解與支持！
      </p>
      <div className="mt-4 flex flex-col gap-y-4">
        <Section>
          <SecondHeading>專輯收藏</SecondHeading>
          <Suspense fallback={<CardLoading />}>
            <UserCollectionWrapper type="release" context="main" />
          </Suspense>
        </Section>
        <Section>
          <SecondHeading>藝人收藏</SecondHeading>
          <Suspense fallback={<CardLoading />}>
            <UserCollectionWrapper type="artist" context="main" />
          </Suspense>
        </Section>
      </div>
    </>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section> {children} </section>;
}

function SecondHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-2xl font-medium text-primary">{children}</h2>;
}
