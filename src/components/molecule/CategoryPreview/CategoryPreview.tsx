import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { ProductInfo } from '@/model/productModel';

import { useCurrency } from '@/context/CurrencyContext';

type CategoryPreviewProps = {
  category: string;
  products: ProductInfo[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ category, products }) => {
  const router = useRouter();
  const { convertPrice } = useCurrency();

  const handleClick = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="w-full my-6">
      <h2 className="text-2xl font-bold text-start mb-6">{category}</h2>
      <div className="flex justify-start items-center gap-4 flex-wrap">
        {products &&
          products.map((product, index) => (
            <div
              key={index}
              className="relative p-4 rounded-xl hover:shadow-xl transition-shadow bg-white border border-gray-100 flex flex-col items-center group cursor-pointer"
              onClick={() => handleClick(product.id)}
            >
              <div className="w-[200px] h-[200px] relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={product.featuredImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-blue-600 font-semibold">
                {convertPrice(product.price).formatted}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
