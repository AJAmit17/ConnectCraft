import { getExperimentById } from "@/actions/experiment.action";
import ParseHtml from "@/components/parseHTML";

//@ts-ignore
const Page = async ({params}) => {
  const result = await getExperimentById({ experimentId: params.id })

  // console.log(result);
  return (
    <>
      <div className='flex items-center justify-center flex-col w-full'>
        <div>
          <h2>year</h2>
          <h2>aceYear</h2>
          <h2>Branch</h2>
          <h2>CCode</h2>
          <h2>CName</h2>
        </div>
        <h2 className='font-semibold mt-3.5 w-full text-left'>
          {/* ExpNo */}
          {/* title */}
        </h2>
      </div>

      {/* description */}
      <ParseHtml
        data={''}     //content
      />

      {/* solution */}
      <ParseHtml
        data={''}     //content
      />
    </>
  )
}

export default Page;