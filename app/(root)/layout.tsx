/* eslint-disable @next/next/no-sync-scripts */
import Navbar from "@/components/navbar";
import LeftSideBar from "@/components/leftSidebar";
import RightSideBar from "@/components/rightSidebar";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <LeftSideBar />
        <section className="flex-1 flex flex-col px-6 pb-6 pt-36 max-mb:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">
            {children}
            <Footer />
          </div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}
