import React, { ReactNode, Suspense } from "react";

import WikiSummary from "@/components/wiki-summary";

import TextLoading from "@/components/text-loading";
import CardLoading from "@/components/card-loading";
import RelavantSection from "@/components/genre-page/relavant-section";
import { sleep } from "@/lib/utils";

type GenrePageProps = { params: { genre: string } };

export default async function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="text-4xl font-semibold text-primary">
        {decodeURIComponent(params.genre)}
      </h1>
      <Suspense fallback={<TextLoading />}>
        <WikiSummary genre={params.genre} />
      </Suspense>
      <div className="flex flex-col gap-y-4">
        <Section>
          <SecondHeading> 帶有此風格的專輯：</SecondHeading>
          <Suspense fallback={<CardLoading />}>
            <RelavantSection query={params.genre} type="release" />
          </Suspense>
        </Section>
        <Section>
          <SecondHeading> 帶有此風格的藝人：</SecondHeading>
          <Suspense fallback={<CardLoading />}>
            <RelavantSection query={params.genre} type="artist" />
          </Suspense>
        </Section>
      </div>
    </>
  );
}

type SectionProps = { children: ReactNode };

export function Section({ children }: SectionProps) {
  return (
    <>
      <section className="flex flex-col items-center gap-y-5">
        {children}
      </section>
    </>
  );
}

function SecondHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="self-start text-2xl font-medium text-primary">{children}</h2>
  );
}
