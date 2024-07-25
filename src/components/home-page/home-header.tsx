import React from "react";
import Header from "../header";
import RouteList from "../route-list";
import { headerRoutes } from "@/lib/constants";

export default function HomeHeader() {
  return (
    <>
      <Header isLanding={false}>
        <RouteList
          routes={headerRoutes}
          ulClassName="hidden items-center gap-x-4 sm:flex"
        />
      </Header>
    </>
  );
}
