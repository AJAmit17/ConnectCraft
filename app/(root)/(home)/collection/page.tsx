import { getSavedQuestion } from '@/actions/user.action'
import Filter from '@/components/search/filter'
import LocalSearch from '@/components/search/localSearch'
import { QuestionFilters } from '@/constants/filter'
import { auth } from "@clerk/nextjs"
import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/NoResult'

import type { Metadata } from "next";
import { SearchParamsProps } from '@/Types'
import Pagination from '@/components/pagination'

export const metadata: Metadata = {
    title: "Collections | ConnectCraft",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
    const { userId } = auth();

    if (!userId) return null;

    const result = await getSavedQuestion({
        clerkId: userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
    });
    // console.log(result);

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route={"/collection"}
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for questions"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses="max-md:flex"
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {
                    result.questions.length > 0
                        ? (
                            //@ts-ignore
                            result?.questions.map((item) => (
                                <>
                                    <QuestionCard
                                        key={item._id}
                                        _id={item._id}
                                        title={item.title}
                                        tags={item.tags}
                                        author={item.author}
                                        upvotes={item.upvotes}
                                        answers={item.answers}
                                        views={item.views}
                                        createdAt={item.createdAt}
                                        type='Collection'
                                    />
                                </>
                            ))
                        )
                        : (
                            <NoResult
                                title="No Saved Questions Found"
                                description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
                                href="/"
                                BtnHeading="Explore Questions"
                            />
                        )
                }
            </div>
            <div className="mb-2 mt-8">
                <Pagination
                    isNext={false}
                    pageNumber={0}
                />
            </div>
        </>
    );
};

export default Page;