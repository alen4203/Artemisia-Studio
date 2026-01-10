import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import ProductCategories from '@/components/organism/ProductCategories/ProductCategories';
import ImageGallery from '@/components/organism/ImageGallery/ImageGallery';
import type { ProductInfo } from '@/model/productModel';
import { products } from '@/mock/products';

export default function Products({ products }: { products: ProductInfo[] }) {
    const productImages = [
        { src: '/images/1600x900.svg', alt: 'Aromatic Candles' },
        { src: '/images/1600x900.svg', alt: 'Diverse Collection' },
        { src: '/images/1600x900.svg', alt: 'Luxury Scents' },
    ];

    return (
        <Layout>
            <div className="w-full flex flex-col items-center pb-20 bg-gray-50 min-h-screen">
                <ImageGallery images={productImages} />
                <div className="w-full max-w-7xl mx-auto px-6 mt-16">
                    <div className="flex flex-col items-center mb-12">
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">Our Collection</span>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Curated Scents</h1>
                        <div className="w-20 h-1 bg-black mt-6 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <ProductCategories products={products} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<{
    products: ProductInfo[];
}> = async () => {
    return {
        props: {
            products: products,
        },
    };
};
