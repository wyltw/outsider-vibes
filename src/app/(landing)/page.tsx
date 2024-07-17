import BackgroundPattern from "@/components/background-pattern";
import CallToAction from "@/components/call-to-action";
import Feature from "@/components/feature";
import FinalCallToAction from "@/components/final-call-to-action";

import SellingProposition from "@/components/selling-proposition";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <BackgroundPattern>
        <div className="container">
          <CallToAction />
        </div>
      </BackgroundPattern>

      <div className="container">
        <SellingProposition />
        <Feature />
        <FinalCallToAction />
      </div>
    </>
  );
}
