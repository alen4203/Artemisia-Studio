import { FC } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

const CheckoutPage: FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
          <p className="text-gray-600 mb-6">
            This page will be implemented next!
          </p>
          <Link
            href="/cart"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium inline-block"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
