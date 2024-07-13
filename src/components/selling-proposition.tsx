import React, { ReactNode } from "react";
import PropositionCard from "./proposition-card";
import SecondHeading from "./second-heading";

export default function SellingProposition() {
  return (
    <>
      <section className="flex flex-col items-center gap-y-8 px-36 py-28">
        <SecondHeading>探索音樂，分享快樂</SecondHeading>
        <PropositionCard
          imageSrc="/images/nft-marketplace.svg"
          imageAlt="treasure"
          label="UNEARTHING"
          textLines={[
            "與他人分享自己喜愛的音樂",
            "在這裡不用煩惱自己的喜好不被接受。",
          ]}
        >
          <PropositionCardHeading>
            發現
            <span className="text-secondary">埋藏的</span>
            音樂寶藏
          </PropositionCardHeading>
        </PropositionCard>
        <PropositionCard
          imageSrc="/images/discussion.svg"
          imageAlt="discussion"
          label="CONNECTING"
          textLines={[
            "身邊沒有喜歡後硬核，UK hardcore的朋友？",
            "或者自己的音樂喜好還停留在上個世紀？",
            "在這裡，你可以找到任何音樂風格的愛好者。",
          ]}
          className="order-first"
        >
          <PropositionCardHeading>
            聚集
            <span className="text-secondary">志同道合的</span>
            愛好者
          </PropositionCardHeading>
        </PropositionCard>
      </section>
    </>
  );
}

function PropositionCardHeading({ children }: { children: ReactNode }) {
  return <h3 className="whitespace-nowrap text-3xl font-medium">{children}</h3>;
}
