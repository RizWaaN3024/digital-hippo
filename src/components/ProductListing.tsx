"use client"

import { Product } from '@/payload-types';
import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductListingProps {
    product: Product | null;
    index: number;
}

const ProductListing = ({product, index}: ProductListingProps) => {
    const [isVisible, setIsvisible] = useState<boolean>(false);

    if (!product || !isVisible) return <ProductPlaceholder />

    if (isVisible && product) {
        return <Link className={cn(`invisible h-full w-full cursor-pointer group/main`, {
            "visible animate-in fade-in-5": isVisible,
        })} href={`/product/${product.id}`}></Link>
    }
}

const ProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full' />
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
        </div>
    )
}

export default ProductListing
