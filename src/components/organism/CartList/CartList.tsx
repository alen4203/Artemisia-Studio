import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import CartContext from '@/context/CartContext';
import CartItemCard from '@/components/molecule/CartItemCard/CartItemCard';
import { CartItem } from '@/types/cart';
import { ProductInfo } from '@/model/productModel';

type CartListProps = {
  featuredProducts?: ProductInfo[];
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
};

const CartList: FC<CartListProps> = ({ featuredProducts, onShowToast }) => {
  const { cartState, updateQuantity, removeItem } = useContext(CartContext);
  const router = useRouter();

  const handleIncrement = (item: CartItem) => {
    updateQuantity(item);
    onShowToast('Quantity updated', 'success');
  };

  const handleDecrement = (item: CartItem) => {
    updateQuantity(item);
    onShowToast('Quantity updated', 'success');
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item);
    onShowToast(`${item.name} removed from cart`, 'info');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (cartState.cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add some products to get started!
        </p>
        <button
          onClick={handleContinueShopping}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
        >
          Continue Shopping
        </button>

        {/* Featured Products */}
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="mt-12 w-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              You might like
            </h3>
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <div className="relative w-full aspect-square mb-2">
                    <img
                      src={product.featuredImage}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                  <p className="text-blue-500 font-medium">${product.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
        <button
          onClick={handleContinueShopping}
          className="text-blue-500 hover:text-blue-600 font-medium text-sm"
        >
          ← Continue Shopping
        </button>
      </div>

      {cartState.cart.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
