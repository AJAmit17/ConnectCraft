import { getUserById } from "@/actions/user.action";
import ExperimentForm from "@/components/forms/Experiment";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { getExperimentById } from "@/actions/experiment.action";
import { ParamsProps } from "@/Types";

export const metadata: Metadata = {
  title: "Edit Lab Experiment | ConnectCraft",
};

export default async function Home({ params }: ParamsProps) {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });
  const res = await getExperimentById({ experimentId: params.id });

  return (
    <div>
      <h1 className=' text-3xl font-bold'>Upload Experiment</h1>
      <div className='mt-9'>
        {
          mongoUser._id == '66005f8a463f2faa6cbd522c'
            ? <ExperimentForm
              type="edit"
              monogoUserId={JSON.stringify(mongoUser._id)}
              experimentDetails={JSON.stringify(res)}
            />
            : <h1>You are not Allowed to Edit Experiments</h1>
        }
      </div>
    </div>
  );
}