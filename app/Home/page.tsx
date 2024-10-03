import React from 'react'
import Header from '../components/Header'

type Props = {}

const page = (props: Props) => {
  return (
    <div className=' bg-gradient-to-b from-customStart to-customEnd min-h-screen'>
        <div className="py-6">
        <Header />
        </div>
    </div>
  )
}

export default page