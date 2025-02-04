import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='w-full bg-blue-600 h-20'>

        <nav className=''>
            <ul className='flex'>
            <li>
       <Link href='/auth'><button className='bg-blue-300 text-black p-3 mx-20 my-3'>
        Profile</button></Link> </li>
<li>
        <Link href='/contactForm'><button className='bg-blue-300 text-black p-3 mx-20 my-3'>
      Contact</button></Link></li>
<li>
      <Link href='/product'><button className='bg-blue-300 text-black p-3 mx-20 my-3'>
      Product</button></Link></li>
           </ul>
        </nav>
        
    </header>
  )
}
