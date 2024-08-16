import FirstHeading from "@/components/first-heading";
import SearchForm from "@/components/search-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <main className="col-start-2 col-end-3 h-[calc(100vh_-_80px)]">
        <section className="">
          <div className="grid grid-cols-4 place-items-center">
            <div className="col-start-1 col-end-5 row-start-1 row-end-2 flex w-full flex-col items-center gap-y-10">
              <FirstHeading
                className="z-10 col-start-2 col-end-4 row-start-1 row-end-2"
                mainText="開始音樂"
                highlightText="探索"
              />
              <SearchForm context="home" />
            </div>
            <Image
              className="col-start-3 col-end-5 row-start-1 row-end-2 opacity-80"
              src="/images/headphone-bro.svg"
              alt="headphone"
              width={500}
              height={500}
            />
          </div>
        </section>
      </main>
    </>
  );
}
