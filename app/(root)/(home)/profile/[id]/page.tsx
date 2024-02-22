import { URLProps } from '@/Types';
import { getUserInfo } from '@/actions/user.action';
import { SignedIn, auth } from '@clerk/nextjs';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import QuestionTab from '@/components/QuestionTab';
import AnswerTab from '@/components/AnswerTab';

const ProfilePage = async ({ params, searchParams }: URLProps) => {
    const { userId: clerkId } = auth();
    const userInfo = await getUserInfo({ userId: params.id });

    // console.log(userInfo)

    return (
        <>
            <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
                <div className="flex flex-col items-start gap-4 lg:flex-row">
                    <Image
                        src={userInfo?.user.picture}
                        alt="Profile Picture"
                        width={140}
                        height={140}
                        className="rounded-full border-[3px] border-primary-500 object-cover"
                    />
                    <div className="mt-3">
                        <h2 className="font-bold">
                            {userInfo?.user.name}
                        </h2>
                        <p className="font-bold">
                            @{userInfo?.user.username}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                            profile Info
                        </div>

                        {userInfo?.user.bio && (
                            <p className="paragraph-regular text-dark400_light800 mt-8">
                                <span className="font-medium text-primary-500">Bio: </span>
                                {userInfo?.user.bio}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                    <SignedIn>
                        {clerkId === userInfo?.user.clerkId && (
                            <Link href={"/profile/edit"}>
                                <Button className="text-primary bg-primary-foreground min-h-[46px] min-w-[175px] rounded-md px-4 py-3">
                                    Edit Profile
                                </Button>
                            </Link>
                        )}
                    </SignedIn>
                </div>
            </div>

            <div className="mt-10 flex gap-10">
                <Tabs defaultValue="top-posts" className="flex-1">
                    <TabsList className="background-light800_dark400 min-h-[42px] p-2">
                        <TabsTrigger value="top-posts" className="tab rounded">
                            Top Posts
                        </TabsTrigger>
                        <TabsTrigger value="answers" className="tab rounded">
                            Answers
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="top-posts"
                        className="mt-5 flex w-full flex-col gap-6"
                    >
                        <QuestionTab
                            searchParams={searchParams}
                            userId={userInfo?.user._id}
                            // @ts-ignore
                            clerkId={clerkId}
                        />
                    </TabsContent>
                    <TabsContent value="answers" className="flex w-full flex-col gap-6">
                        <AnswerTab
                            searchParams={searchParams}
                            userId={userInfo?.user._id}
                            // @ts-ignore
                            clerkId={clerkId}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default ProfilePage