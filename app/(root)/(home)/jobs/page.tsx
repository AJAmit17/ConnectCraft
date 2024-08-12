import { fetchCountries, fetchJobs, fetchLocation } from '@/actions/jobs.action';
import AllJobCard from '@/components/cards/JobCard';;
import JobsFilter from '@/components/jobFilter';
import Pagination from '@/components/pagination';

import { Job } from '@/Types';

interface Props {
    searchParams: {
        q: string;
        location: string;
        page: string;
    };
}

const JobsPage = async ({ searchParams }: Props) => {
    const userLocation = await fetchLocation();

    const query = searchParams.q ?? '';
    const location = searchParams.location ?? '';
    const pageNumber = searchParams.page ?? 1;

    const searchQuery =
        query || location
            ? `${query}, ${location}`
            : `${userLocation}`;

    const jobs = await fetchJobs({
        query: searchQuery,
        page: pageNumber,
    });

    console.log(searchParams);

    const countries = await fetchCountries();
    const page = parseInt(searchParams.page ?? 1);

    return (
        <>
            <h1 className="font-bold text-3xl">Jobs</h1>

            <div className="flex">
                <JobsFilter countriesList={countries} />
            </div>

            <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
                {jobs.length > 0 ? (
                    jobs.map((job: Job) => {
                        if (
                            job.job_title &&
                            job.job_title.toLowerCase() !== 'undefined'
                        )
                            return <AllJobCard key={job.id} job={job} />;

                        return null;
                    })
                ) : (
                    <div className="paragraph-regular text-dark200_light800 w-full text-center">
                        Oops! We couldn&apos;t find any jobs at the moment. Please try
                        again later
                    </div>
                )}
            </section>
            {jobs.length > 0 && (
                <Pagination pageNumber={page} isNext={jobs.length === 10} />
            )}
        </>
    );
};

export default JobsPage;