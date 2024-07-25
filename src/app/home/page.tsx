import HomeHeader from "@/components/home-page/home-header";
import Sidebar from "@/components/sidebar";

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <div className="grid grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="col-start-2 col-end-3 h-[calc(100vh_-_80px)]">
          world
        </main>
      </div>
    </>
  );
}
