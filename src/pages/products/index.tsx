import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-export-i18n';
import Layout from '@/components/Layout';
import ProductCategories from '@/components/organism/ProductCategories/ProductCategories';
import ImageGallery from '@/components/organism/ImageGallery/ImageGallery';
import type { ProductInfo } from '@/model/productModel';
import {
  candlesProducts,
  oilProducts,
  crystalProducts,
} from '@/mock/products';

type Tab = 'candles' | 'oils' | 'crystals';

export default function Products({
  candles,
  oils,
  crystals,
}: {
  candles: ProductInfo[];
  oils: ProductInfo[];
  crystals: ProductInfo[];
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('candles');

  const productImages = [
    { src: '/images/1600x900.svg', alt: 'Aromatic Candles' },
    { src: '/images/1600x900.svg', alt: 'Diverse Collection' },
    { src: '/images/1600x900.svg', alt: 'Luxury Scents' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'candles':
        return <ProductCategories products={candles} />;
      case 'oils':
        return <ProductCategories products={oils} />;
      case 'crystals':
        return <ProductCategories products={crystals} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center pb-20 bg-gray-50 min-h-screen">
        <ImageGallery images={productImages} />
        <div className="w-full max-w-7xl mx-auto px-6 mt-16">
          <div className="flex flex-col items-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
              {t('products.ourCollection')}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {t('products.curatedSelection')}
            </h1>
            <div className="w-20 h-1 bg-black mt-6 rounded-full mb-10"></div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('candles')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === 'candles'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {t('products.candles')}
              </button>
              <button
                onClick={() => setActiveTab('oils')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === 'oils'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {t('products.essentialOils')}
              </button>
              <button
                onClick={() => setActiveTab('crystals')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === 'crystals'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {t('products.crystals')}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      candles: candlesProducts,
      oils: oilProducts,
      crystals: crystalProducts,
    },
  };
};
