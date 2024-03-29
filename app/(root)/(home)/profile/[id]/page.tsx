import { URLProps } from '@/Types';
import { getUserById, getUserInfo } from '@/actions/user.action';
import { SignedIn, auth } from '@clerk/nextjs';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs';
import QuestionTab from '@/components/QuestionTab';
import AnswerTab from '@/components/AnswerTab';
import ProfileLink from '@/components/ProfileLink';
import { getJoinedDate } from '@/lib/utils';
import Stats from '@/components/Stats';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';


export async function generateMetadata({
    params,
}: Omit<URLProps, "searchParams">): Promise<Metadata> {
    const user = await getUserById({ userId: params.id });

    return {
        title: `${user.username}'s Profile | ConnectCraft`,
    };
}

const ProfilePage = async ({ params, searchParams }: URLProps) => {
    const { userId: clerkId } = auth();
    const userInfo = await getUserInfo({ userId: params.id });

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
                        <p className="">
                            @{userInfo?.user.username}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                            {/* PORTFOLIO */}
                            {userInfo?.user.protfolio && (
                                <ProfileLink
                                    imgUrl="/assets/icons/link.svg"
                                    href={userInfo.user.protfolio}
                                    title="Portfolio"
                                />
                            )}

                            {/* LOCATION */}
                            {userInfo?.user.location && (
                                <ProfileLink
                                    imgUrl="/assets/icons/location.svg"
                                    title={userInfo.user.location}
                                />
                            )}

                            {/* JOINAT */}
                            <ProfileLink
                                imgUrl="/assets/icons/calendar.svg"
                                title={`${getJoinedDate(userInfo?.user.joinedAt)}`}
                            />
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

            <Stats
                // @ts-ignore
                totalQuestions={userInfo?.totalQuestions}
                // @ts-ignore
                totalAnswers={userInfo?.totalAnswers}
            />

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

            <Separator className="my-10" orientation="horizontal" />

            <div>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">API</h2>
                    <p className="text-sm text-muted-foreground">
                        API Calls for Profile
                    </p>
                </div>
                <ApiList entityName="profile" entityIdName='' />
            </div>
        </>
    )
}

export default ProfilePage