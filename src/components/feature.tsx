import React from "react";
import SecondHeading from "./second-heading";
import { MessageSquare, Music, Star } from "lucide-react";
import FeatureCard from "./feature-card";

const iconStyle = "h-[90%] w-[90%] text-primary";

export default function Feature() {
  return (
    <section className="flex flex-col items-center gap-8 px-36 pb-28">
      <SecondHeading>你的音樂社群</SecondHeading>
      <div className="flex w-full max-w-5xl flex-wrap justify-around gap-y-4">
        <FeatureCard text={"最新的音樂資訊"}>
          <Music className={iconStyle} />
        </FeatureCard>
        <FeatureCard text={"加入多元音樂討論"}>
          <MessageSquare className={iconStyle} />
        </FeatureCard>
        <FeatureCard text={"分享專輯歌曲評價"}>
          <Star className={iconStyle} />
        </FeatureCard>
      </div>
    </section>
  );
}
