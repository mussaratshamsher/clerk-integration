"use client";  

import { useRef, useState } from 'react';  
import emailjs from 'emailjs-com';  

export default function Home() {  
  const form = useRef<HTMLFormElement>(null);  
  const [buttonText, setButtonText] = useState("Submit");  
  const [isSubmit, setIsSubmit] = useState(false);  

  const handleSentEmail = (e: React.FormEvent) => {  
    e.preventDefault();  

    if (form.current) {  
      const formData = new FormData(form.current);  
      const name = formData.get('name')?.toString();  
      const email = formData.get('email')?.toString();  
      const message = formData.get('message')?.toString();  

      // Basic validation  
      if (!name || !email || !message) {  
        alert("Please fill in all fields.");  
        return;  
      }  

      setButtonText("Sending...");  
      setIsSubmit(true);  
      emailjs  
        .sendForm(  
          "service_llxn5np", // service-id  
          "template_hf81pwk", // template-id  
          form.current,  
          "aalNKSamSVii419-x"  // Public API key  
        )  
        .then(  
          () => {  
            alert("Congratulations! Message sent successfully.");  
            setButtonText("Submit");  
            setIsSubmit(false);  
            form.current?.reset();  
          },  
          (error) => {  
            console.error("Sorry! Failed to send", error);  
            alert("Failed to send message. Please try again later.");  
            setButtonText("Submit");  
            setIsSubmit(false);  
          }  
        );  
    }  
  };  

  return (  
    <div className='flex max-w-sm mx-auto p-20 bg-slate-200 mt-5'>  
      <form ref={form} onSubmit={handleSentEmail}>  
        <label htmlFor="name" className='border p-2'>Name</label>  
        <input type="text" id='name' name='name' placeholder='name' required className='border p-2' />  
        <br />  
        <label htmlFor="email">Email</label>  
        <input type="email" id='email' name='email' placeholder='abc@email.com' required className='border p-2' />  
        <br />  
        <label htmlFor="subject">Subject</label>  
        <input type="text" id='subject' name='subject' placeholder='title' className='border p-2' />  
        <br />  
        <label htmlFor="message">Message</label>  
        <textarea name="message" id="message" required className='border p-2'></textarea>  
        <button type='submit' disabled={isSubmit} className='bg-black text-white p-3 rounded-md'>  
          {isSubmit ? 'Sending...' : buttonText}  
        </button>  
      </form>  
    </div>  
  );  
}

// "use client"  
// import { useRef, useState } from 'react';  
// import emailjs from 'emailjs-com';  

// export default function Home() {  
//   const form = useRef<HTMLFormElement>(null);
//   const [buttonText, setButtonText] = useState("Submit");
//   const [isSubmit, setIsSubmit] = useState(false);

//   const handleSentEmail = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.current) {
//       setButtonText("Sending...");
//       setIsSubmit(true); 
//       emailjs  
//         .sendForm( 
//            "service_llxn5np", // service-id  
//            "template_hf81pwk", // template-id 
//           form.current,
//           "aalNKSamSVii419-x"  // Public API key      
//         )  
//         .then(
//           () => {
//             alert("Congratulations! Message sent successfully.");
//             setButtonText("Submit");
//             setIsSubmit(false);
//             form.current?.reset(); 
//           },
//           (error) => {
//             console.error("Sorry! Failed to send", error);
//             alert("Failed to send message: " + error.text);
//             setButtonText("Submit");
//             setIsSubmit(false);
//           }
//         ); 
//     }  
//   };  

//   return (  
//     <div className='flex max-w-sm mx-auto p-20 bg-slate-200 mt-5'>  
//       <form ref={form} onSubmit={handleSentEmail}>  
//         <label htmlFor="name" className='border p-2'>Name</label>  
//         <input type="text" id='name' name='name' placeholder='name' />  
//         <br />  
//         <label htmlFor="email">Email</label>  
//         <input type="email" id='email' name='email' placeholder='abc@email.com' />  
//         <br />  
//         <label htmlFor="subject">Subject</label>  
//         <input type="text" id='subject' name='subject' placeholder='title' />  
//         <br />  
//         <label htmlFor="message">Message</label>  
//         <textarea name="message" id="message"></textarea>  
//         <button type='submit' disabled={isSubmit} className='bg-black text-white p-3 rounded-md'>  
//           {isSubmit ? 'Sending..' : 'Submit'}  
//         </button>  
//       </form>  
//     </div>  
//   );  
// }