import { getUserById } from "@/actions/user.action";
import ExperimentForm from "@/components/forms/Experiment";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Lab Experiment | ConnectCraft",
};

export default async function Home() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className=' text-3xl font-bold'>Upload Experiment</h1>
      <div className='mt-9'>
        {
          mongoUser._id == '66005f8a463f2faa6cbd522c' 
          ? <ExperimentForm /> 
          : <h1>You are not Allowed to Add Experiments</h1>
        }
      </div>
    </div>
  );
}