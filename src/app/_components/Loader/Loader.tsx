import React from 'react'
import { FadeLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='h-[100vh] fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgb(0,0,0,0.6)]'>

    <div className='h-[100%] flex justify-center items-center'>
        <FadeLoader color='gray' />
    </div>
    </div>
  )
}