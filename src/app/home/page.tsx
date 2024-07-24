import HomeHeader from "@/components/home-page/home-header";

export default function HomePage() {
  return (
    <>
      <HomeHeader></HomeHeader>
      <div className="grid grid-cols-[18rem_1fr]">
        <aside className="w-72 border-r border-primary">hello</aside>
        <main>world</main>
      </div>
    </>
  );
}
