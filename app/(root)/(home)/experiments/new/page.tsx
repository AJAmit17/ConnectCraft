import ExperimentForm from "@/components/forms/Experiment";

export default function Home() {
  return (
    <div>
      <h1 className=' text-3xl font-bold'>Upload Experiment</h1>
      <div className='mt-9'>
        <ExperimentForm />
      </div>
    </div>
  );
}