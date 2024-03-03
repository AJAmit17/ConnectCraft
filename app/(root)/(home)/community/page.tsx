import { SearchParamsProps } from '@/Types';
import { getAllUser } from '@/actions/user.action';
import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/search/filter'
import LocalSearch from '@/components/search/localSearch'
import { UserFilters } from '@/constants/filter'
import Link from 'next/link';

import type { Metadata } from "next";
import Pagination from '@/components/pagination';
import { ApiList } from '@/components/ui/api-list';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: "Community | ConnectCraft",
};

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUser({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="text-3xl font-bold">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="right"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Amazing Minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:max-w-[170px]"
          containerClasses=""
        />
      </div>

      <section className="mt-10 flex flex-col flex-wrap gap-6 sm:flex-row">
        {result.user.length > 0
          ? (result.user.map((user) => (
            <UserCard
              key={user.name}
              user={user}
            />
          )))
          : (
            <>
              <div className="mx-auto max-w-4xl text-center">
                <p>No Users Yet ...</p>
                <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
                  Join to be the first ...
                </Link>
              </div>
            </>
          )
        }
      </section>
      <div className="mb-2 mt-8">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      </div>

      <Separator className="my-10" orientation="horizontal" />

      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">API</h2>
          <p className="text-sm text-muted-foreground">
            API Calls for Community
          </p>
        </div>
        <ApiList entityName="community" entityIdName="" />
      </div>
    </>
  )
}

export default CommunityPage
