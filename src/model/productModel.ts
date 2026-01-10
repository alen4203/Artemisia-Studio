export const ProductCategories = ['能量加強', '香氛療癒', '美麗周邊'] as const;

export type ProductCategory = (typeof ProductCategories)[number];

export type ProductInfo = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  featuredImage: string;
  images: string[];
};
