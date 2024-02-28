import { URLProps } from "@/Types";
import { getExperimentById } from "@/actions/experiment.action";
import ParseHtml from "@/components/parseHTML";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Omit<URLProps, "searchParams">): Promise<Metadata> {
  const experiment = await getExperimentById({ experimentId: params.id });

  return {
      title: `${experiment.ExpName} | ConnectCraft`,
  };
}

//@ts-ignore
const Page = async ({ params }) => {
  const result = await getExperimentById({ experimentId: params.id })

  return (
    <>
      <div className='flex items-center justify-center flex-col w-full'>
        <div className="flex items-center justify-between w-full">
          <h2 className='text-3xl font-semibold mt-3.5'>
            <span className="mx-1">{result.ExpNo}.</span>{result.ExpName}
          </h2>
          |
          <h2>
            {result.aceYear}
          </h2>
          |
          <h2>
            {result.year}
          </h2>
          |
          <h2>
            {result.CCode}
          </h2>
          |
          <h2>
            {result.CName}
          </h2>
        </div>
      </div>

      <Separator className="my-10" orientation="horizontal" />

      {/* description */}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold mb-6">
          Description:
        </h1>
        <ParseHtml
          data={result.ExpDesc}     //content
        />
      </div>

      <Separator className="my-10" orientation="horizontal" />

      {/* solution */}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold mb-6">
          Solution:
        </h1>
      </div>
      <ParseHtml
        data={result.ExpSoln}     //content
      />
    </>
  )
}

export default Page;