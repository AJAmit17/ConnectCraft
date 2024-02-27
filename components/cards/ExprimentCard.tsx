import Link from 'next/link';
import { Badge } from '../ui/badge';

interface Props {
    _id: string;
    year: number;
    aceYear: string;
    Branch: string;
    CCode: string;
    CName: string;
    ExpNo: number;
    ExpName: string;
    ExpDesc: string;
    ExpSoln: string;
}

const ExprimentCard = ({
    _id,
    year,
    aceYear,
    Branch,
    CCode,
    CName,
    ExpNo,
    ExpName
}: Props) => {
    return (
        <div className='bg-primary-foreground p-9 sm:px-11 rounded-[10px] shadow-xl'>
            <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
                <div>
                    <Link href={`/experiments/${_id}`}>
                        <span>Experiment No: {ExpNo}</span>
                        <h3 className=' text-2xl font-bold line-clamp-1 flex-1'>{ExpName}</h3>
                    </Link>
                </div>

            </div>

            <div className='flex items-center justify-between mt-6 w-full flex-wrap gap-3'>
                <Badge className='px-4 py-2 bg-violet-700 text-white'>
                    <span className='font-bold mr-1'>
                        Year:
                    </span>
                    {year}
                </Badge>
                <Badge className='px-4 py-2 bg-violet-700 text-white'>
                    <span className='font-bold mr-1'>
                        Branch:
                    </span>
                    {Branch}
                </Badge>
                <Badge className='px-4 py-2 bg-violet-700 text-white'>
                    <span className='font-bold mr-1'>
                        AY:
                    </span>
                    {aceYear}
                </Badge>
                <Badge className='px-4 py-2 bg-violet-700 text-white'>
                    <span className='font-bold mr-1'>
                        CourseCode:
                    </span>
                    {CCode}
                </Badge>
                <Badge className='px-4 py-2 bg-violet-700 text-white'>
                    <span className='font-bold mr-1'>
                        CourseName:
                    </span>
                    {CName}
                </Badge>
            </div>
        </div>
    )
}

export default ExprimentCard;