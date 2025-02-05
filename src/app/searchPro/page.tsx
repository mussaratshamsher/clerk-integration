"use client"
import React, { useState, FormEvent } from "react"; // Import useState and FormEvent from React   
import { Button } from "@/components/ui/button"; // Import custom Button component   
import { Card, CardContent } from "@/components/ui/card"; // Import custom Card components   
import Link from "next/link"; // Import Link component from Next.js   
import { SearchIcon } from "lucide-react"; // Import SearchIcon from lucide-react   
import ClipLoader from "react-spinners/ClipLoader";   
import Image from "next/image"; // Import Next.js Image component   

// Define the Product interface   
interface Product {   
  id: number;   
  title: string;   
  price: number;   
  category: string;   
  image: string;   
}   

// Example categories   
const categories = [   
  "electronics",   
  "jewelery",   
  "men's clothing",   
  "women's clothing",   
];   

export default function CategorySearch() {   
  // State to manage the selected category   
  const [category, setCategory] = useState<string>("");   
  // State to manage the list of fetched products   
  const [products, setProducts] = useState<Product[]>([]);   
  // State to manage the loading state during the API fetch   
  const [loading, setLoading] = useState<boolean>(false);   
  // State to manage if a search has been performed   
  const [searched, setSearched] = useState<boolean>(false);   

  // Function to handle the category selection   
  const handleSearch = async (event: FormEvent) => {   
    event.preventDefault();   
    setLoading(true);   
    setSearched(true);   
    setProducts([]); // Clear previous products   

    try {   
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);   
      const data = await response.json();   
      console.log(data); // Log the API response   

      if (Array.isArray(data) && data.length > 0) {   
        setProducts(data); // Set fetched products if data is valid   
      } else {   
        console.warn("No products found for this category.");   
      }   
    } catch (error) {   
      console.error("Error fetching products:", error);   
    }   

    setLoading(false);   
  };   

  // JSX for rendering the Category Search UI   
  return (   
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto p-4 md:p-6">   
      {/* Header section */}   
      <header className="flex flex-col items-center mb-6">   
        <h1 className="text-3xl font-bold mb-2">Product Category Search</h1>   
        <p className="text-lg mb-4">   
          Find products by selecting a category.   
        </p>   
        {/* Search form */}   
        <form className="relative w-full max-w-md mb-6" onSubmit={handleSearch}>   
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="pr-10">   
            <option value="">Select a category</option>   
            {categories.map((cat) => (   
              <option key={cat} value={cat}>   
                {cat}   
              </option>   
            ))}   
          </select>   
          <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">   
            <SearchIcon className="w-5 h-5" />   
          </Button>   
        </form>   
      </header>   
      {/* Loading spinner */}   
      {loading ? (   
        <div className="flex flex-col justify-center items-center w-full h-full">   
          <ClipLoader className="w-10 h-10 mb-4" />   
          <p>Loading products, please wait...</p>   
        </div>   
      ) : (   
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">   
          {/* Message for no products found */}   
          {searched && products.length === 0 && (   
            <p>No products found. Try selecting a different category.</p>   
          )}   
          {/* Display list of products */}   
          {products.map((product) => (   
            <Card className="group relative" key={product.id}>   
              <Image   
                src={product.image}   
                alt={product.title}   
                width={400}   
                height={300}   
                className="rounded-t-lg object-cover w-full h-48 group-hover:opacity-50 transition-opacity"   
              />   
              <CardContent className="p-4">   
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>   
                <p className="text-muted-foreground line-clamp-2">   
                  {`Price: $${product.price}`}   
                </p>   
              </CardContent>   
              <Link   
                href={`/products/${product.id}`}   
                className="absolute inset-0 z-10"   
                prefetch={false}   
              >   
                <span className="sr-only">View product details</span>   
              </Link>   
            </Card>   
          ))}   
        </div>   
      )}   
    </div>   
  );   
}