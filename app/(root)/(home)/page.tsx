import HomeFilters from "@/components/HomeFilters";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import Navbar from "@/components/navbar";
import Filter from "@/components/search/filter";
import LocalSearch from "@/components/search/localSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title: 'How do I get started with Next.js?',
    tags: [
      {
        _id: 1,
        name: 'Next.js'
      },
      {
        _id: 2,
        name: 'Tailwindcss'
      },
      {
        _id: 3,
        name: 'TypeScript'
      }
    ],
    author: {
      _id: 101,
      name: 'John ODen',
      picture: '/assets/images/auth-dark.png'
    },
    upvotes: 1548066,
    views: 10514684,
    answers: [1, 2, 3, 4, 5],
    createdAt: new Date('2024-01-24T00:00:00Z'),
  },
  {
    _id: 2,
    title: 'How do I get started with Next.js?',
    tags: [
      {
        _id: 1,
        name: 'Next.js'
      },
      {
        _id: 2,
        name: 'Tailwindcss'
      },
      {
        _id: 3,
        name: 'TypeScript'
      }
    ],
    author: {
      _id: 101,
      name: 'John ODen',
      picture: '/path/to/john-oden-profile.jpg'
    },
    upvotes: 7248066,
    views: 65146845,
    answers: [1, 2, 3, 5, 2, 5, 2, 5],
    createdAt: new Date('2024-01-24T00:00:00Z'),
  },
  {
    _id: 3,
    title: 'How do I get started with Next.js?',
    tags: [
      {
        _id: 1,
        name: 'Next.js'
      },
      {
        _id: 2,
        name: 'Tailwindcss'
      },
      {
        _id: 3,
        name: 'TypeScript'
      }
    ],
    author: {
      _id: 101,
      name: 'John ODen',
      picture: '/path/to/john-oden-profile.jpg'
    },
    upvotes: 7248066,
    views: 65146845,
    answers: [1, 2, 3, 5, 2, 5, 2, 5],
    createdAt: new Date('2024-01-24T00:00:00Z'),
  },
  {
    _id: 4,
    title: 'How do I get started with Next.js?',
    tags: [
      {
        _id: 1,
        name: 'Next.js'
      },
      {
        _id: 2,
        name: 'Tailwindcss'
      },
      {
        _id: 3,
        name: 'TypeScript'
      }
    ],
    author: {
      _id: 101,
      name: 'John ODen',
      picture: '/assets/images/auth-dark.png'
    },
    upvotes: 1548066,
    views: 10514684,
    answers: [1, 2, 3, 4, 5],
    createdAt: new Date('2024-01-24T00:00:00Z'),
  }
];

export default function Home() {
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
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0
          ? questions.map((item) => (
            <QuestionCard
              key={item._id}
              _id={item._id}
              title={item.title}
              tags={item.tags}
              author={item.author}
              upvotes={item.upvotes}
              views={item.views}
              answers={item.answers.map(answer => ({ id: answer, text: '' }))}
              createdAt={item.createdAt}
            />
          ))
          : <NoResult
            title="lorem35"
            description="lorem56"
            href="/ask-question"
            BtnHeading="Ask a Question" />
        }
      </div>
    </>
  );
}