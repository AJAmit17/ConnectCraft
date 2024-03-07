import { ParamsProps } from "@/Types";
import { getUserById } from "@/actions/user.action";
import ProfileForm from "@/components/forms/ProfileForm";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: ParamsProps) => {
    const { userId } = auth();

    if (!userId) return null;

    const mongoUser = await getUserById({ userId });

    return (
        <>
            <h1>Edit Profile</h1>
            <div className="mt-9">
                <ProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
            </div>
        </>
    );
};

export default Page;