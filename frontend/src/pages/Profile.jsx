import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import { getUserInfo } from '../utils/index.js'
import { NoProfile } from "../assets";
import TextInput from '../components/TextInput'
import Loading from '../components/Loading'

const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const { posts } = useSelector((state) => state.posts)

    const getUser = async() => {
        const res = await getUserInfo(user?.token, id)
        setUserInfo(res)
    }

    useEffect(() => {
        setLoading(true)
        getUser()
    }, [id])

    return (
        <>
        <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
            <TopBar />
            <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-0 md:pb-10 h-full">
                {/* LEFT */}
                <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto md:pl-4 lg:pl-0'>
                    <ProfileCard user={userInfo} />
                </div>
                {/* CENTER */}
                <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto pl-4">
                    <div className="block md:hidden">
                        <ProfileCard user={userInfo} />
                    </div>
                    {/* {loading ? (
                        <Loading />
                    ) :  } */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile