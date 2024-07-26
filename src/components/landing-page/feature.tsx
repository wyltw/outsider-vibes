import React from "react";
import SecondHeading from "./second-heading";
import { MessageSquare, Music, Star } from "lucide-react";
import FeatureCard from "./feature-card";

const iconStyle = "h-[90%] w-[90%] text-primary";

export default function Feature() {
  return (
    <section className="mb-28 flex flex-col items-center gap-y-8">
      <SecondHeading>你的音樂社群</SecondHeading>
      <div className="flex w-full max-w-5xl flex-col flex-wrap items-center gap-y-4 lg:flex-row lg:justify-around">
        <FeatureCard text={"最新的音樂資訊"}>
          <Music className={iconStyle} />
        </FeatureCard>
        <FeatureCard duration={0.5} text={"加入多元音樂討論"}>
          <MessageSquare className={iconStyle} />
        </FeatureCard>
        <FeatureCard duration={1} text={"分享專輯歌曲評價"}>
          <Star className={iconStyle} />
        </FeatureCard>
      </div>
    </section>
  );
}
