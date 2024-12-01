import { URLProps } from "@/Types";
import { getExperimentById } from "@/actions/experiment.action";
import ParseHtml from "@/components/parseHTML";
import { ApiList } from "@/components/ui/api-list";
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
        data={result.ExpSoln}
        type="solution"     //content
      />

      <Separator className="my-10" orientation="horizontal" />

      {result.youtubeLink && (
        <div className="mt-6">
          <h1 className="text-2xl font-semibold mb-6">
            Video Tutorial:
          </h1>
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${result.youtubeLink.split('/').pop()?.split('?')[0]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      <Separator className="my-10" orientation="horizontal" />

      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">API</h2>
          <p className="text-sm text-muted-foreground">
            API Calls for Experiments
          </p>
        </div>
        <ApiList entityName="experiments" entityIdName="experimentId" />
      </div>
    </>
  )
}

export default Page;