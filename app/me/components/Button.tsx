import Link from 'next/link'
import React from 'react'

const Button = () => {
  return (
    <div>
      <Link href="/me">
        edit
      </Link>
    </div>
  )
}

export default Button
