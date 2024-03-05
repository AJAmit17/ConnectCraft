import { getAllExperiment } from '@/actions/experiment.action'
import NoResult from '@/components/NoResult'
import ExprimentCard from '@/components/cards/ExprimentCard'
import LocalSearch from '@/components/search/localSearch'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from "next";
import { SearchParamsProps } from '@/Types'
import Pagination from '@/components/pagination'

export const metadata: Metadata = {
    title: "NHCE CSE-DS Lab Experiments | ConnectCraft",
    description: "NO need to Find PDFs of Lab Manual, One Stop destination for all Lab Experiments."
};

const Page = async ({
    searchParams
}: SearchParamsProps) => {
    //@ts-ignore
    const result = await getAllExperiment({
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
    });

    // console.log(result);

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-3xl font-bold">NHCE CSE-DS Lab Experiments</h1>
            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/experiments"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search Experiments"
                    otherClasses="flex-1"
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {
                    result.experiments.length > 0
                        ? result.experiments.map((item) => (
                            <ExprimentCard
                                key={item._id}
                                _id={item._id}
                                year={item.year}
                                aceYear={item.aceYear}
                                Branch={item.Branch}
                                CCode={item.CCode}
                                CName={item.CName}
                                ExpNo={item.ExpNo}
                                ExpName={item.ExpName}
                                ExpDesc={item.ExpDesc}
                                ExpSoln={item.ExpSoln}
                            />
                        ))
                        : <NoResult
                            title="No Experiments Found"
                            description="Sorry for the Inconvenience."
                            href="/"
                            BtnHeading="Back to Homepage"
                        />
                }
            </div>

            <div className="mb-4 mt-10">
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result?.isNext}
                />
            </div>

            <div className='flex items-center justify-center mt-6'>
                <Button className="bg-violet-700 min-h-[46px] px-4 py-3 text-white">
                    <Link href="/experiments/new">
                        Add New Experiment
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default Page