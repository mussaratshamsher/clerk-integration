"use client"  

import { useRef, useState } from 'react';  
import emailjs from 'emailjs-com';  

export default function Home() {  
  const [isSubmit, setIsSubmit] = useState<boolean>(false);  
  const form = useRef<HTMLFormElement>(null);  

  const handleSentEmail = (e: React.FormEvent) => {  
    e.preventDefault();  
    setIsSubmit(true); // Set to true when starting to send  

    if (form.current) {  
      emailjs  
        .sendForm(  
          "service_llxn5np",   // service-id  
          "template_hf81pwk",  // template-id  
          form.current,  
          "aalNKSamSVii419-x"   // Public API key (userid)  
        )  
        .then(  
          () => {  
            alert("Congratulations! Message sent Successfully.");  
            setIsSubmit(false); // Reset after success  
            
            // Clear the form fields  
            if (form.current) {  
              form.current.reset(); // This will reset all fields in the form  
            }  
          },  
          (error) => {  
            console.error("Sorry! Failed To send", error); // Log the error  
            alert("Failed to send Message: " + error.text); // Show error message  
            setIsSubmit(false); // Reset on failure  
          }  
        );  
    }  
  };  

  return (  
    <div className='flex max-w-sm mx-auto p-20 bg-slate-200 mt-5'>  
      <form ref={form} onSubmit={handleSentEmail}>  
        <label htmlFor="name" className='border p-2'>Name</label>  
        <input type="text" id='name' name='name' placeholder='name' />  
        <br />  
        <label htmlFor="email">Email</label>  
        <input type="email" id='email' name='email' placeholder='abc@email.com' />  
        <br />  
        <label htmlFor="subject">Subject</label>  
        <input type="text" id='subject' name='subject' placeholder='title' />  
        <br />  
        <label htmlFor="message">Message</label>  
        <textarea name="message" id="message"></textarea>  
        <button type='submit' className='bg-black text-white p-3 rounded-md'>  
          {isSubmit ? 'Sending...' : 'Submit'}  
        </button>  
      </form>  
    </div>  
  );  
}