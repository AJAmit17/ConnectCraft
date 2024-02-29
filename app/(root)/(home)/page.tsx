import { getQuestions } from "@/actions/question.action";
import { getUserById } from "@/actions/user.action";
import HomeFilters from "@/components/HomeFilters";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import Navbar from "@/components/navbar";
import Filter from "@/components/search/filter";
import LocalSearch from "@/components/search/localSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/Types";

export const metadata: Metadata = {
  title: "Home | ConnectCraft",
};

export default async function Home({
  searchParams
}: SearchParamsProps) {
  const { userId: clerkId } = auth();
  const result = await getQuestions({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold">Ask Questions</h1>
        <Link href='/ask-questions' className="flex justify-end max-sm:w-full">
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
          containerClasses=""
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0
          ? result.questions.map((item) => (
            <QuestionCard
              key={item._id}
              _id={item._id}
              //@ts-ignore
              clerkId={clerkId}
              title={item.title}
              tags={item.tags}
              author={item.author}
              upvotes={item.upvotes}
              views={item.views}
              answers={item.answers}
              createdAt={item.createdAt}
            />
          ))
          : <NoResult
            title="No Questions Found"
            description="Be the first user to ask questions."
            href="/ask-questions"
            BtnHeading="Ask a Question"
          />
        }
      </div>
    </>
  );
}