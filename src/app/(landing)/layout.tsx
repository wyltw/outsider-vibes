import Footer from "@/components/footer";
import Header from "@/components/header";

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
