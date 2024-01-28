import HomeFilters from "@/components/HomeFilters";
import Navbar from "@/components/navbar";
import Filter from "@/components/search/filter";
import LocalSearch from "@/components/search/localSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Ask Questions</h1>
        <Link href='/' className="flex justify-end max-sm:w-full">
          <Button className="bg-violet-700 min-h-[46px] px-4 py-3 text-white">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search questions"
            otherClasses="flex-1"
          />
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] sm:max-w-[170px]"
            containerClasses = "hidden max-md:flex"
          />
        </div>

        <HomeFilters />
    </>
  );
}