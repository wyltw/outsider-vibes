import React, { ReactNode } from "react";
import Logo from "./logo";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { RouteItem } from "@/lib/type";

const routes: RouteItem[] = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Privacy policy",
    path: "/",
  },
  {
    name: "Terms & conditions",
    path: "/",
  },
];

const linkItemStyle =
  "text-sm text-black/50 hover:underline transition underline-offset-4 hover:text-black/100";

export default function Footer() {
  return (
    <footer className="flex max-h-[25rem] flex-col justify-center gap-y-4 bg-airforce-50">
      <div className="container flex w-full max-w-5xl flex-col justify-around md:flex-row md:items-center">
        <Logo
          width={224}
          height={133}
          className="mt-4 h-auto w-full max-w-[224px]"
        />
        <section className="mt-8 space-y-4">
          <FooterInfoBlock title="OUTSIDERVIBES" routes={routes} />
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
        </section>
      </div>
      <small className="text-center">&copy;2024 By wyltw</small>
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
              <Link href={route.path} className={linkItemStyle}>
                {route.name}
              </Link>
            </li>
          ))}
        {children}
      </ul>
    </div>
  );
}
