import { URLProps } from '@/Types'
import { getQuestionsByTagId } from '@/actions/tag.action';
import NoResult from '@/components/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import LocalSearch from '@/components/search/localSearch';
import React from 'react'

const Page = async({ params, searchParams }: URLProps) => {

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
        </>
    )
}

export default Page