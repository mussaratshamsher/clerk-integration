
import ContactForm from '@/components/theme/ContactForm'
import React from 'react'

export default function contactForm() {
  return (
    <div className=' grid mx-auto bg-yellow-50 border-2 border-yellow-400 rounded-md p-20 mt-10 max-w-sm'>
        <h1>Contact me 
          <br />Zod, Shadcn, Emailjs
        </h1>
        <h2><ContactForm/></h2>
    </div>
  )
}
