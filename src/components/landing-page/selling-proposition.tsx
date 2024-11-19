import React, { ReactNode } from "react";
import PropositionCard from "./proposition-card";
import SecondHeading from "./second-heading";
import discussion from "/public/images/discussion.svg";
import nftMarketPlace from "/public/images/nft-marketplace.svg";

export default function SellingProposition() {
  return (
    <>
      <section className="my-28 flex flex-col items-center gap-y-8">
        <SecondHeading>你的音樂探索</SecondHeading>
        <PropositionCard
          imageSrc={nftMarketPlace}
          imageAlt="treasure"
          label="UNEARTHING"
          textLines={"與他人分享自己喜愛的音樂，不用煩惱自己的喜好不被接受。"}
        >
          <PropositionCardHeading>
            發現
            <span className="text-secondary">埋藏的</span>
            音樂寶藏
          </PropositionCardHeading>
          {/* 事實上，jsx結構完全可以作為props傳遞，先前的問題可能來自於未能正確處理作為props傳遞的jsx。不過對目前的children props已經感到滿意，不再變更*/}
        </PropositionCard>
        <PropositionCard
          imageSrc={discussion}
          imageAlt="discussion"
          label="CONNECTING"
          textLines={
            "喜歡的音樂過於冷門？或者品味停留在上個世紀？在這裡找到任何音樂風格的同好。"
          }
          className="md:order-first"
        >
          <PropositionCardHeading>
            聚集
            <span className="text-secondary">知己的</span>
            愛好者
          </PropositionCardHeading>
        </PropositionCard>
      </section>
    </>
  );
}

function PropositionCardHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="whitespace-nowrap text-2xl font-medium sm:text-3xl">
      {children}
    </h3>
  );
}
