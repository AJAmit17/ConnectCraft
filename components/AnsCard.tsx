import Link from "next/link";
import Matric from "@/components/matric";
import { formatTimeAgo } from "@/lib/utils";
interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className=" bg-primary-foreground rounded-[10px] px-11 py-9 font-bold"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <h3 className="line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        <Matric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • asked ${createdAt.toDateString()}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
        />

        <div className="flex items-center justify-center gap-3">
          <Matric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={upvotes}
            title=" Votes"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;