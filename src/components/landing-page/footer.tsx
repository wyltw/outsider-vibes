import React, { ReactNode } from "react";
import Logo from "../logo";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { RouteItem } from "@/lib/types";
import Copyright from "../copyright";
import { footerRoutes } from "@/lib/constants";
import CustomLink from "../CustomLink";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center gap-y-4 bg-airforce-50">
      <div className="container flex w-full max-w-5xl flex-col justify-around md:flex-row md:items-center">
        <Logo width={224} height={133} className="mt-4" />
        <section className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
          <FooterInfoBlock title="OUTSIDERVIBES" routes={footerRoutes} />
          <FooterInfoBlock title="CONTACT">
            <li className="flex items-center">
              <Button variant="ghost" size={"icon"} className="h-7 w-7" asChild>
                <Link href="https://github.com/wyltw">
                  <Image
                    src="/images/github.svg"
                    alt="github"
                    width={24}
                    height={24}
                  />
                </Link>
              </Button>
            </li>
          </FooterInfoBlock>
          <FooterInfoBlock title="CREDITS">
            <CustomLink href="/attribution">Attribution</CustomLink>
          </FooterInfoBlock>
        </section>
      </div>
      <Copyright />
    </footer>
  );
}

type FooterInfoProps = {
  title: string;
  routes?: RouteItem[];
  children?: ReactNode;
};

function FooterInfoBlock({ routes, title, children }: FooterInfoProps) {
  return (
    <div>
      <h4 className="mb-2 tracking-wider">{title}</h4>
      <ul>
        {routes &&
          routes.map((route) => (
            <li key={route.name}>
              <CustomLink href={route.path}>{route.name}</CustomLink>
              {/* 在這裡不使用Shadcn Button組件，因為該組件有padding而一般link不需要 */}
            </li>
          ))}
        {children}
      </ul>
    </div>
  );
}
