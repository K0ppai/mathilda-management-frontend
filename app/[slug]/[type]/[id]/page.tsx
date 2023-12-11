import Form from '@/app/components/Form';
import React from 'react';

const page = ({ params }: { params: { slug: string; type: string; id: string } }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Form slug={params.slug} type={params.type} id={params.id} />
    </div>
  );
};

export default page;
