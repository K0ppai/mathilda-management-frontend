import Form from '@/app/components/Form'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Form slug={params.slug}/>
    </div>
  )
}

export default page
