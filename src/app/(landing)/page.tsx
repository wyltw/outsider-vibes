import CallToAction from "@/components/call-to-action";
import Feature from "@/components/feature";
import FinalCallToAction from "@/components/final-call-to-action";
import Header from "@/components/header";
import SellingProposition from "@/components/selling-proposition";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div className="cta__container">
        <div className="container">
          <Image
            className="cta__background-image"
            src="/images/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg"
            alt="background"
            fill
          />
          {/* 這裡的背景圖片定位於cta__container,且z-index為-1，依賴於cta__container的大小，而cta__container的大小依賴於section*/}
          <Header />
          <CallToAction />
        </div>
      </div>
      <div className="container">
        <SellingProposition />
        <Feature />
        <FinalCallToAction />
      </div>
    </>
  );
}
