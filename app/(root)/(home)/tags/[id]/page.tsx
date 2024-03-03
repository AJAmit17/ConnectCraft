import { URLProps } from '@/Types'
import { getQuestionsByTagId, getTagById } from '@/actions/tag.action';
import NoResult from '@/components/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import LocalSearch from '@/components/search/localSearch';
import { ApiList } from '@/components/ui/api-list';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({
    params,
}: Omit<URLProps, "searchParams">): Promise<Metadata> {
    const tag = await getTagById({ tagId: params.id });

    return {
        title: `Posts by tag '${tag.name}' | DevOverflow`,
        description: tag.description || `Questions tagged with ${tag.name}`,
    };
}


const Page = async ({ params, searchParams }: URLProps) => {

    const result = await getQuestionsByTagId({
        tagId: params.id,
        page: searchParams.page ? +searchParams.page : 1,
        searchQuery: searchParams.q,
    });


    return (
        <>
            <h1 className="h1-bold text-dark100_light900 uppercase">
                {/* {result?.tagTitle} */}
            </h1>
            <div className="mt-11 w-full">
                <LocalSearch
                    route={`/tags/${params.id}`}
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for Tag's Questions"
                    otherClasses="flex-1"
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {
                    //  @ts-ignore
                    result.questions.length > 0 ? (
                        //  @ts-ignore
                        result?.questions.map((item) => (
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
                            />
                        ))
                    ) : (
                        <NoResult
                            title="No Saved Tag's Questions Found"
                            description="It appears that there are no saved tag's questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
                            href={''}
                            BtnHeading={''}
                        />
                    )
                }
            </div>
            {/* <div className="mb-2 mt-8">
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    // @ts-ignore
                    isNext={result?.isNext}
                />
            </div> */}

            <Separator className="my-10" orientation="horizontal" />

            <div>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">API</h2>
                    <p className="text-sm text-muted-foreground">
                        API Calls for Tags
                    </p>
                </div>
                <ApiList entityName="tags" entityIdName={''} />
            </div>
        </>
    )
}

export default Page