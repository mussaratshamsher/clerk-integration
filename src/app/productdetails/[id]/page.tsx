//   {/* image Gallery  */}
//   <div className="grid grid-cols-4 ">  
//   {/* Products Gallery */}  
// <div className='flex md:grid md:col-span-1 gap-2 p-2 md:p-0'>           
// <Image  src={product.image} alt={product.title}  width={500} height={500}   
// className='rounded-md w-24 h-24 mt-2'/> 
// <Image  src={product.image} alt={product.title}  width={500} height={500}   
// className='rounded-md w-24 h-24 mt-2 lg:mt-5'/> 
// <Image  src={product.image} alt={product.title}  width={500} height={500}   
// className='rounded-md w-24 h-24 mt-2 lg:mt-5'/> 
// <Image  src={product.image} alt={product.title}  width={500} height={500}   
// className='rounded-md w-24 h-24 mt-2 lg:mt-5'/> 
// </div>   

// <div className='col-span-4 p-5 md:p-0 md:col-span-3'>  
// <Image src={product.image}   
// alt={product.title} width={500} height={500} className='rounded-md' />   
// </div>

// </div>

import { Button } from '@/components/ui/button';  
import { Facebook, Instagram, Twitter } from 'lucide-react';  
import Image from 'next/image';  
import Link from 'next/link';  
import { notFound } from 'next/navigation';  
import { FaStar, FaRegStar, FaHeart } from 'react-icons/fa';  
import { FaCartShopping } from 'react-icons/fa6';  

interface Product {  
    title: string;  
    id: string;  
    image: string;  
    description: string;  
    price: number;  
    yellowstars: number;  
    graystars: number;  
    category: string;  
    tags: string;  
    reviews: string;  
}  

const productDetails = async (id: string): Promise<Product | null> => {  
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);  
    if (!response.ok) return null; // Error handling  
    return response.json();  
};  

const ProductDetails = async ({ params }: { params: { id: string } }) => {  
    const product = await productDetails(params.id);  
    if (!product) {  
        console.error("Product not found for ID:", params.id);  
        notFound();  
    }   

    return (  
        <div className="text-gray-600 body-font overflow-hidden">  
            <div className="max-w-[1440px] container mx-auto mb-5">  
                <div className='grid lg:grid-cols-2 mx-10 my-10'>  
                    {/* Image Gallery */}  
                    <div className="grid grid-cols-4">  
                        <div className='flex md:col-span-1 gap-2 p-2'>           
                            {[...Array(4)].map((_, index) => (  
                                <Image key={index} src={product.image} alt={product.title} width={500} height={500} className='rounded-md w-24 h-24 mt-2 lg:mt-5' />  
                            ))}  
                        </div>   
                        <div className='col-span-4 p-5 md:col-span-3'>  
                            <Image src={product.image} alt={product.title} width={500} height={500} className='rounded-md' />   
                        </div>  
                    </div>  
                    
                    {/* Details */}  
                    <div className="lg:pl-10 lg:py-6">  
                        <h1 className="text-3xl font-bold mb-1">{product.title}</h1>  
                        <h2 className="text-base text-gray-500">{product.category}</h2>  
                        <h2 className="text-base">{product.tags}</h2>  

                        <div className="flex py-2">  
                            <div className='flex'>  
                                {Array.from({ length: product.yellowstars }, (_, i) => <FaStar key={i} className='text-yellow-400' />)}  
                                {Array.from({ length: product.graystars }, (_, i) => <FaRegStar key={i} className='text-gray-400' />)}  
                            </div>   
                            <span className="text-gray-600 ml-3">{product.reviews} Reviews</span>  
                            <div className='flex'>   
                                <Facebook className='hover:text-[#b88f14]' />  
                                <Twitter className='hover:text-[#b88f14]' />  
                                <Instagram className='hover:text-[#b88f14]' />   
                            </div>  
                        </div>  
                        <p className="leading-relaxed">{product.description}</p>  
                        
                        {/* Color and Size Selection */}  
                        <div className="mt-6 border-b-2 border-gray-100 mb-5">  
                            <div className="flex items-center">  
                                <span className="mr-3">Color</span>  
                                {['#ffffff', '#744c1d', '#d2aa33', '#000000'].map((color, index) => (  
                                    <button key={index} style={{ backgroundColor: color }} className={`border-2 border-gray-300 rounded-full w-6 h-6 ${index === 0 ? 'border-black' : ''}`} />  
                                ))}  
                            </div>   
                            <div className="flex items-center ml-6">  
                                <span className="mr-3">Size</span>  
                                <select className="rounded border border-gray-300 py-2">  
                                    {['SM', 'M', 'L', 'XL'].map(size => <option key={size}>{size}</option>)}  
                                </select>  
                            </div>  
                        </div>  

                        {/* Price and Buttons */}  
                        <div className="flex flex-col md:flex-row gap-3">  
                            <span className="font-medium text-2xl">${product.price}</span>                            
                            <div className='flex gap-3'>   
                                <Link href='/cart'>  
                                    <Button>  
                                        <FaCartShopping /> Add to Cart  
                                    </Button>   
                                </Link>   
                                <Link href='/checkout'>  
                                    <Button>  
                                        <FaHeart /> Shop Now  
                                    </Button>   
                                </Link>  
                            </div>  
                        </div>                     
                    </div>  
                </div>   
            </div>   
        </div>  
    );  
};  

export default ProductDetails;