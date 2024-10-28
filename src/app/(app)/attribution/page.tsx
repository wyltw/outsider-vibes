import CustomLink from "@/components/custom-link";
import React, { ReactNode } from "react";

export default function AttributionPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-medium text-primary">Attribution</h1>
      <Section>
        <SecondHeading>Icons</SecondHeading>
        <ul>
          <li>
            <CustomLink href="https://www.flaticon.com/free-icons/user">
              Smashicons - Flaticon
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.flaticon.com/free-icons/emoji">
              Freepik - Flaticon
            </CustomLink>
          </li>
        </ul>
      </Section>
      <Section>
        <SecondHeading>Illustrations</SecondHeading>
        <ul>
          <li>
            <CustomLink href="https://storyset.com">
              illustrations by Storyset
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://store.streamlinehq.com/products/manila">
              illustrations by Streamline
            </CustomLink>
          </li>
        </ul>
      </Section>
      <Section>
        <SecondHeading>Photo</SecondHeading>
        <ul>
          <li>
            <CustomLink href="https://unsplash.com/de/fotos/eine-nahaufnahme-einer-weissen-wand-mit-wellenformigen-linien-75xPHEQBmvA">
              Jean-Philippe Delberghe - Unsplash
            </CustomLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}

function SecondHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-xl text-primary">{children}</h2>;
}

function Section({ children }: { children: ReactNode }) {
  return <section className="text-xl text-primary">{children}</section>;
}
