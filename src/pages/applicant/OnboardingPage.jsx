import React from 'react'
import ApplicantForm from '../../components/applicant/ApplicantForm'

export default function OnboardingPage() {
  return (
   <div className='h-screen flex-col md:flex-row lg:flex-col justify-center items-center m-5'>

    {/* Left Panel */}
    <div className='mb-5 text-3xl'>
        <span className='text-[#2E99B0] font-bold'>Welcome</span><br /> Applicant
    </div>

    <span className='mb-5'> Thank you for your interest in joining our program. Please complete the form with accurate information — especially your email address, as it will be used to link your account and test results.</span>
    <br />
    <div className='mt-5'>
        <span className='text-[#2E99B0]'>Good luck</span> — we’re excited to see how you perform!
    </div>

    {/* Right Panel */}
    <ApplicantForm/>
   </div>
  )
}
