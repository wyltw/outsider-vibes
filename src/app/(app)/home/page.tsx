import FirstHeading from "@/components/first-heading";
import SearchForm from "@/components/search-page/search-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="mt-20 flex flex-col items-center sm:mt-0">
        <div className="grid grid-cols-4 place-items-center self-stretch">
          <div className="col-start-1 col-end-5 row-start-1 row-end-2 flex w-full flex-col items-center gap-y-10">
            <FirstHeading
              className="z-10 col-start-2 col-end-4 row-start-1 row-end-2"
              mainText="開始音樂"
              highlightText="探索"
            />
            <SearchForm context="home" />
          </div>
          <Image
            className="hidden sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-2 sm:block sm:opacity-80"
            src="/images/headphone-bro.svg"
            alt="headphone"
            width={500}
            height={500}
          />
        </div>
        <Image
          className="-mt-36 opacity-80 sm:hidden"
          src="/images/headphone-bro.svg"
          alt="headphone"
          width={500}
          height={500}
        />
      </section>
    </>
  );
}
