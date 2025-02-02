"use client"

import {useRef} from 'react';
import emailjs from 'emailjs-com'

export default function Home() {

  const form = useRef<HTMLFormElement>(null)
  const sentEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if(form.current){
      emailjs
      .sendForm(
        "llxn5np",   //service-id
        "hf81pwk",  //template-id
        form.current,
        "ZoBysdbHZWxrwepi8" //userid
      )
      .then(
        () => {
          alert("Congratulations! Message sent Successfully.")
        },
        (error) => {
          console.log("Sorry! Failed To send", error);
          alert("Failed to send Message")
        }
      )
    }
  }
  return (
    <div className='flex max-w-sm mx-auto p-20 bg-slate-200'>
      
      <form action="">
        <label htmlFor="name" className='border p-2'>Name</label>
        <input type="text" id='name' name='name' placeholder='Ali'/>
      <br />
      <label htmlFor="email">Email</label>
      <input type="email" id='email' name='email' placeholder='@email.com'/>
      <br />
      <label htmlFor="subject">Subject</label>
      <input type="text" id='subject' placeholder='title'/>
      <br />
      <label htmlFor="message">Message</label>
      <textarea name="message" id="message"></textarea>

      <button type='submit' className='bg-black text-white p-3 rounded-md'>Submit Message</button>
      </form>
   
    </div>
  );
}

