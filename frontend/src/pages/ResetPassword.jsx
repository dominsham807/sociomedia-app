import React, { useState } from 'react'
import TextInput from '../components/TextInput';
import { useForm } from 'react-hook-form';
import Loading from '../components/Loading';
import CustomButton from '../components/CustomButton';
import { apiRequest } from '../utils';

const ResetPassword = () => {
    const [errMsg, setErrMsg] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(errMsg)
    const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm({mode: "onChange"})

    const onSubmit = async(data) => {
        setIsSubmitting(true) 
        try{
            const res = await apiRequest({
                url: "/users/request-password/reset",
                data: data,
                method: "POST"
            })
            console.log(res)
            if (res?.status === "failed") {
                setErrMsg(res);
            } else {
                setErrMsg(res);
            }
            setIsSubmitting(false)
        } catch(error){
            console.log(error);
            setIsSubmitting(false);
        }
    }
    
    return (
        <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6'>
            <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
                <p className="text-ascent-1 text-lg font-semibold">Email Address</p>
                <span className="text-sm text-ascent-2">
                    Enter email address during registration
                </span>
                <form className='py-4 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        name='email'
                        placeholder='email@example.com'
                        type='email'
                        register={register("email", {
                        required: "Email Address is required!",
                        })}
                        styles='w-full rounded-lg'
                        labelStyle='ml-2'
                        error={errors.email ? errors.email.message : ""}
                    />
                    {errMsg?.message && (
                        <span
                        role='alert'
                        className={`text-sm ${
                            errMsg?.message
                            ? "text-[#f64949fe]"
                            : "text-[#2ba150fe]"
                        } mt-0.5`}
                        >
                        {errMsg?.message}
                        </span>
                    )}
                    {isSubmitting ? (
                        <Loading />
                    ): (
                        <CustomButton type="submit" title="Submit" 
                        containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`} />
                    )}
                </form>
            </div>
        </div>
    )
}

export default ResetPassword