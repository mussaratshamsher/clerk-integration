
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'


export default function Auth() {
  return (
    <div className='flex max-w-md mx-auto bg-green-200 justify-center items-center my-5 md:my-10
    p-5 md:p-10'>

 <div className=' '> 
<ClerkProvider>
     
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
</ClerkProvider>

<h1 className=''></h1>
<h1 className='font-bold md:text-2xl lg:text-3xl text-1xl text-center'>Welcome in F<span id='clr'>oo</span>dtuck</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia qui
   nihil similique, ratione commodi ipsa tempora doloremque consequuntur atque incidunt magnam blanditiis 
  recusandae, amet voluptas enim soluta! Neque, veniam asperiores?</p>
 <h2 className='font-mono my-2 underline text-center'>Email: email@Foodtuck.com</h2>
</div>
    </div>
  )
}
