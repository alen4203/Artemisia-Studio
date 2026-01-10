import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { useState, useContext } from 'react';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import type { ProductInfo } from '@/model/productModel';
import Layout from '@/components/Layout';
import CartContext from '@/context/CartContext';

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addItem, removeItem, updateQuantity, getItemInfoFromCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handlePrev = () => {
    // TODO: implement handlePrev
    setCurrentImageIndex(currentImageIndex - 1)
  }
  const handleNext = () => {
    // TODO: implement handleNext
    setCurrentImageIndex(currentImageIndex + 1)
  }
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      featuredImage: product.featuredImage,
      quantity: quantity,
    })
  }

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-6 py-12 tablet:py-20">
        <div className="flex flex-col desktop:flex-row gap-12 desktop:gap-20">
          {/* Left Column: Images */}
          <div className="w-full desktop:w-1/2">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <div
                className={`flex h-full transition-transform duration-500 ease-out`}
                style={{
                  width: `${product.images.length * 100}%`,
                  transform: `translateX(${-100 * currentImageIndex / product.images.length}%)`
                }}
              >
                {product.images.map((image, index) => (
                  <div key={index} className="relative w-full h-full flex-shrink-0">
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                  <button
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all disabled:opacity-0 disabled:pointer-events-none"
                    disabled={currentImageIndex === 0}
                    onClick={handlePrev}
                  >
                    ←
                  </button>
                  <button
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all disabled:opacity-0 disabled:pointer-events-none"
                    disabled={currentImageIndex === product.images.length - 1}
                    onClick={handleNext}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full desktop:w-1/2 flex flex-col pt-4">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">{product.category}</span>
            <h1 className="text-4xl desktop:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{product.name}</h1>
            <p className="text-3xl font-medium text-gray-900 mb-8">{product.price}</p>

            <div className="w-full h-px bg-gray-200 mb-8" />

            <p className="text-lg text-gray-600 leading-relaxed mb-10">{product.description}</p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-start gap-6">
                <span className="text-gray-900 font-semibold">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity(prev => prev === 0 ? 0 : prev - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 hover:shadow-lg transform active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
                <span>•</span>
                <span>{product.price}</span>
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Free shipping on all orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

interface Params extends ParsedUrlQuery {
  productId: string;
}

import { products } from '@/mock/products';

export const getStaticProps: GetStaticProps<{
  product: ProductInfo;
}> = async ({ params }) => {
  const { productId } = params as Params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product: ProductInfo) => ({
    params: { productId: product.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
