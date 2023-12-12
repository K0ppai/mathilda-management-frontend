import Form from '@/app/components/Form';
import React from 'react';

const page = ({ params }: { params: { slug: string; type: string } }) => {
  return (
    <div className="h-[550px] flex justify-center items-center">
      <Form slug={params.slug} type={params.type} />
    </div>
  );
};

export default page;
