import { getAllTags } from '@/actions/tag.action';
import NoResult from '@/components/NoResult';
import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/search/filter'
import LocalSearch from '@/components/search/localSearch'
import { TagFilters } from '@/constants/filter'
import Link from 'next/link';

import type { Metadata } from "next";
import { SearchParamsProps } from '@/Types';
import Pagination from '@/components/pagination';

export const metadata: Metadata = {
    title: "Tags | ConnectCraft",
};

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
    const result = await getAllTags({
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
    });

    return (
        <>
            <h1 className="text-3xl font-bold">All Tags</h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/tags"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for Tags"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={TagFilters}
                    otherClasses="min-h-[56px] sm:max-w-[170px]"
                    containerClasses=""
                />
            </div>

            <section className="mt-12 flex flex-wrap gap-6">
                {result.tags.length > 0
                    ? (result.tags.map((tag) => (
                        <Link
                            key={tag._id}
                            href={`/tags/${tag._id}`}
                        // className="w-1/2 max-sm:w-full cursor-pointer"
                        >
                            <article className='flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
                                <div className='w-fit rounded-md px-5 py-[8px]'>
                                    <p>{tag.name}</p>
                                </div>

                                <p className='mt-3.5'>
                                    <span className='text-violet-700 mr-2.5'>{tag.questions.length}+</span> Questions
                                </p>
                            </article>
                        </Link>
                    )))
                    : (
                        <NoResult title={"No Tags Found"} description={"Create a tag by asking a questiona and adding a tag"} href="/ask-questions" BtnHeading={'Ask Questions'} />
                    )
                }
            </section>
            <div className="mb-2 mt-8">
                <Pagination isNext={result.isNext} pageNumber={0}                    
                />
            </div>
        </>
    )
}

export default CommunityPage
