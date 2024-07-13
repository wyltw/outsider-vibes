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
        <Image
          className="cta__background-image"
          src="/images/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg"
          alt="background"
          fill
        />
        <Header />
        <CallToAction />
      </div>
      <SellingProposition />
      <Feature />
      <FinalCallToAction />
    </>
  );
}
