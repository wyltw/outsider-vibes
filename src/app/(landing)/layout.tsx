import Footer from "@/components/footer";
import LandingHeader from "@/components/landing-page/landing-header";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
