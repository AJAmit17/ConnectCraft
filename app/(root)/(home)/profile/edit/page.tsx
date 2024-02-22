import { auth } from '@clerk/nextjs';
import React from 'react'

const ProfilePage = async() => {

    const { userId: clerkId } = auth();
    // const userInfo = await getUserInfo({ userId: params.id });
    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage