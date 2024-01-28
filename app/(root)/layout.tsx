import Navbar from "@/components/navbar";
import LeftSideBar from "@/components/leftSidebar";
import RightSideBar from "@/components/rightSidebar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="relative">
            <Navbar />
            <div className="flex">
                {/* leftSide bar */}
                <LeftSideBar />

                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-mb:pb-14 sm:px-14">
                    <div className="mx-auto w-full max-w-5xl">
                        {children}
                    </div>
                </section>

                {/* right side bar */}
                <RightSideBar />

            </div>
            {/* Toasters */}
        </main>
    );
};
