import CategoryPreview from '@/components/molecule/CategoryPreview/CategoryPreview';
import { ProductCategories as categories } from '@/model/productModel';
import type { ProductCategory, ProductInfo } from '@/model/productModel';

type ProductCategoriesProps = {
  products: ProductInfo[];
};

const ProductCategories = ({ products }: ProductCategoriesProps) => {
  const getProductsOfSameCategory = (category: ProductCategory) => {
    return products.filter((product) => product.category === category);
  };
  return (
    <div className="w-full">
      {categories.map((category, index) => (
        <CategoryPreview
          key={index}
          category={category}
          products={getProductsOfSameCategory(category)}
        />
      ))}
    </div>
  );
};

export default ProductCategories;
