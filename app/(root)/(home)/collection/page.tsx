import { getSavedQuestions } from '@/actions/user.action'
import Filter from '@/components/search/filter'
import LocalSearch from '@/components/search/localSearch'
import { QuestionFilters } from '@/constants/filter'
import { auth } from "@clerk/nextjs"
import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/NoResult'

const CollectionsPage = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const result = await getSavedQuestions({
        clerkId: userId,
    })

    console.log(result)
    return (
        <>
            <h1 className="text-3xl font-bold">Saved Questions</h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search questions"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:max-w-[170px]"
                    containerClasses=""
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {result.questions.length > 0
                    ?
                    // result.questions.map((item) => (
                    //     <QuestionCard
                    //         key={item._id}
                    //         _id={item._id}
                    //         title={item.title}
                    //         tags={item.tags}
                    //         author={item.author}
                    //         upvotes={item.upvotes}
                    //         views={item.views}
                    //         answers={item.answers.map((answer: any) => ({ id: answer, text: '' }))}
                    //         createdAt={item.createdAt}
                    //     />
                    // ))
                    <div>testing</div>
                    : <NoResult
                        title="No Questions Found"
                        description="Be the first user to ask questions."
                        href="/ask-questions"
                        BtnHeading="Ask a Question"
                    />
                }
            </div>
        </>
    )
}

export default CollectionsPage