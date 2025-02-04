
"use client";  

import React, { useEffect, useState } from 'react';  
import { Button } from '@/components/ui/button';  
import { FaCartShopping } from "react-icons/fa6";  
import Image from 'next/image';  
import { FaHeart } from 'react-icons/fa';  
import Link from 'next/link';  

interface Product {  
  title: string;  
  category: string;  
  id: string;  
  image: string;  
  description: string;  
  price: number;  
  quantity: number;  
}  

export default function ProductList() {  
  const [data, setData] = useState<Product[]>([]);  
  const [loading, setLoading] = useState(true);  // To manage loading state  

  useEffect(() => {  
    const fetchProducts = async () => {  
      try {  
        const response = await fetch('https://fakestoreapi.com/products');  
        const jsonData = await response.json();  
        setData(jsonData);  
      } catch (error) {  
        console.error('Error fetching data:', error);  
      } finally {  
        setLoading(false);  // Indicates loading is complete  
      }  
    };  

    fetchProducts();  
  }, []);  

  const handleAddToCart = (product: Product) => {  
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');  
    if (cart[product.id]) {  
      cart[product.id].quantity += 1;  
    } else {  
      cart[product.id] = { ...product, quantity: 1 };  
    }  
    localStorage.setItem('cart', JSON.stringify(cart));  
  };  

  const handleAddToWishlist = (product: Product) => {  
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');  
    wishlist[product.id] = product; // Add or update in wishlist  
    localStorage.setItem('wishlist', JSON.stringify(wishlist));  
    alert("Item added to wishlist!");  
  };  

  // Return a loading state if data is still being fetched  
  if (loading) {  
    return <div>Loading products...</div>;  
  }  

  // Return the product list once data is loaded  
  return (  
    <div className='container mx-auto max-w-[1440px]'>  
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-5 md:mx-5 lg:mx-10 py-5 md:gap-3 lg:gap-5'>  
        {data.map((product) => (  
          <div key={product.id} className='grid border-none rounded shadow-[#f4dec6] shadow-md w-32 md:w-60 lg:w-72 hover:bg-slate-50 text-center lg:mb-0 z-10 group'>  
            <Link href={`/productdetails/${product.id}`}>  
              <Image src={product.image} alt={product.title} width={500} height={500} className='w-28 h-28 md:w-60 md:h-60 lg:w-[270px] lg:h-72 m-2' />  
              <h2 className='text-xs lg:text-sm'>{product.title}</h2>  
              <p className='font-medium text-sm lg:font-bold'>${product.price}</p>  
            </Link>  
            <div className='grid gap-1 md:flex md:justify-evenly mb-1 md:mb-2'>  
              <Button onClick={() => handleAddToCart(product)}>  
                <FaCartShopping className='hover:bg-black/60 hover:animate-pulse' /> Add to Cart  
              </Button>  
              <Button onClick={() => handleAddToWishlist(product)}>  
                <FaHeart className='hover:bg-black/60 hover:animate-pulse' /> Wishlist  
              </Button>  
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
}