import React from 'react'
import { Link } from 'react-router-dom'
import { TbSocial } from "react-icons/tb"
import { BsMoon, BsSun, BsSunFill } from "react-icons/bs"
import { IoMdNotificationsOutline } from "react-icons/io"
import TextInput from './TextInput'
import { useForm } from 'react-hook-form'
import CustomButton from './CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { SetTheme } from '../redux/theme.js'
import { Logout } from '../redux/userSlice.js'

const TopBar = () => {
    const { theme } = useSelector((state) => state.theme)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(theme)
    const { register, handleSubmit, formState: {errors}} = useForm({ mode: "onChange" })

    const handleTheme = () => {
        const themeValue = theme === "light" ? "dark" : "light"

        dispatch(SetTheme(themeValue))
    }
    
    return (
        <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
            <Link to="/" className='flex gap-2 items-center'>
                <div className="p-1 md:p-2 bg-[#065ad8] rounded textd-white">
                    <TbSocial />
                </div>
                <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>
                    SocioMedia
                </span>
            </Link>
            <form className="hidden md:flex items-center justify-center">
                <TextInput placeholder="Search..." register={register("search")} 
                styles="w-[18rem] lg:w-[38rem]  rounded-l-full py-3" />
                <CustomButton title="Search" type="submit" 
                containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full" />
            </form>
            <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
                <button onClick={() => handleTheme()}>
                    {theme ? <BsMoon /> : <BsSunFill />}
                </button>
                <div className="hidden lg:flex">
                    <IoMdNotificationsOutline />
                </div>
                <div>
                    <CustomButton onClick={() => dispatch(Logout())} title="Logout" 
                    containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default TopBar