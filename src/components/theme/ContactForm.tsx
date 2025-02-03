"use client";

import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from 'emailjs-com';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define validation schema with Zod
const formSchema = z.object({
    name: z.string().min(3, { message: "UserName must be at least 3 characters" }).max(20, { message: "Write a maximum of 20 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters" }).max(20, { message: "Subject must not exceed 20 characters!" }),
    message: z.string().min(20, { message: "Use at least 20 characters!" }).max(200, { message: "You can use a maximum of 200 characters" })
});

type FormType = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [popupType, setPopupType] = useState<'success' | 'error' | null>(null);

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (values: FormType) => {
        setIsSubmit(true);
        setPopupMessage(null);
        setPopupType(null);

        try {
            const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
            const apiKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY;

            if (!serviceId || !templateId || !apiKey) {
                throw new Error('Missing EmailJS environment variables');
            }

            await emailjs.send(serviceId, templateId, values, apiKey);

            setPopupMessage("Congratulations! Message sent successfully.");
            setPopupType('success');
            form.reset();

        } catch (error: unknown) {
            console.error("Submission error:", error);

            const message = error instanceof Error ? error.message : "An unexpected error occurred.";
            setPopupMessage("Failed to send message: " + message);
            setPopupType('error');
        } finally {
            setIsSubmit(false);
        }
    };

    const handlePopupClick = () => {
        setPopupMessage(null);
        setPopupType(null);
    };

    useEffect(() => {
        if (popupMessage) {
            const timer = setTimeout(() => {
                setPopupMessage(null);
                setPopupType(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [popupMessage]);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className='border border-[#a9820f]' placeholder="Name here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input className='border border-[#a9820f]' placeholder="email@yourdomain.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input className='border border-[#a9820f]' placeholder="Subject here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Input className='border border-[#a9820f]' placeholder="Your message here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

         <Button
          className='bg-[#a9820f] hover:bg-[#c7a53f] duration-300 font-semibold'
          type="submit" disabled={isSubmit}>
          {isSubmit ? 'Processing' : 'Submit'}
          </Button>

                    {/* Popup Message */}
                    {popupMessage && (
                        <div onClick={handlePopupClick}
           className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded 
        shadow-md cursor-pointer z-50
        ${popupType === 'success' ? 'border-[#c7a53f] text-[#a9820f]' : 'border-red-500 text-red-700'}`}
          >
          {popupMessage}
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
}