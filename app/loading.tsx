import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';


const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <CircularProgress />
    </div>
  );
}

export default Loading
