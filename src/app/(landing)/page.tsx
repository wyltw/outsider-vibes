import BackgroundPattern from "@/components/landing-page/background-pattern";
import CallToAction from "@/components/landing-page/call-to-action";
import Feature from "@/components/landing-page/feature";
import FinalCallToAction from "@/components/landing-page/final-call-to-action";
import SellingProposition from "@/components/landing-page/selling-proposition";

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
