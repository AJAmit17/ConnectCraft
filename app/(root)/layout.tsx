import Navbar from "@/components/navbar";
import LeftSideBar from "@/components/leftSidebar";
import RightSideBar from "@/components/rightSidebar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Navbar />
            <div className="flex relative">
                <LeftSideBar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-mb:pb-14 sm:px-14">
                    <div className="mx-auto w-full max-w-5xl">
                        {children}
                    </div>
                </section>
                <RightSideBar />
            </div>
            {/* Toasters */}
        </main>
    );
};
