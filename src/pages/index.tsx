import type { GetStaticProps } from 'next';

import Layout from '@/components/Layout';
import IndexPage from '@/components/template/IndexPage';
import type { ProductInfo } from '@/model/productModel';
import { products } from '@/mock/products';

export default function Home() {
  return (
    <Layout>
      <IndexPage />
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
