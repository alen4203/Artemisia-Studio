import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { ProductInfo } from '@/model/productModel';

type CategoryPreviewProps = {
  category: string;
  products: ProductInfo[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ category, products }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="w-full my-6">
      <h2 className="text-2xl font-bold text-start mb-6">{category}</h2>
      <div className="flex justify-start items-center gap-4">
        {products &&
          products.map((product, index) => (
            <div key={index} className="relative rounded-md hover:shadow-md">
              <button
                type="button"
                className="absolute left-0 top-0 w-full h-full bg-transparent rounded-md"
                onClick={() => handleClick(product.id)}
              />
              <h3 className="text-xl font-semibold mb-4 text-gray-600">
                {product.name}
              </h3>
              <div className="w-[200px] h-[200px]">
                <Image
                  src={product.featuredImage}
                  alt="product"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
