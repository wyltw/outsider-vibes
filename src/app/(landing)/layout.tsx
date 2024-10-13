import Footer from "@/components/landing-page/footer";
import Header from "@/components/layout/header";

import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header page="landing" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
