import { getAllUser } from '@/actions/user.action';
import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/search/filter'
import LocalSearch from '@/components/search/localSearch'
import { UserFilters } from '@/constants/filter'
import Link from 'next/link';

const CommunityPage = async () => {
  const result = await getAllUser({});

  return (
    <>
      <h1 className="text-3xl font-bold">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
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
    </>
  )
}

export default CommunityPage
