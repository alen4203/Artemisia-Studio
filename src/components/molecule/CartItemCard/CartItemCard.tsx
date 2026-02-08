import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/types/cart';
import { formatPrice } from '@/utils/priceCalculator';
import { useCurrency } from '@/context/CurrencyContext';
import RemoveItemModal from '@/components/atom/Modal/RemoveItemModal';

type CartItemCardProps = {
  item: CartItem;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
};

const CartItemCard: FC<CartItemCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const { convertPrice } = useCurrency();
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleIncrement = () => {
    onIncrement({ ...item, quantity: item.quantity + 1 });
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onDecrement({ ...item, quantity: item.quantity - 1 });
    }
  };

  const handleRemoveClick = () => {
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    onRemove(item);
    setShowRemoveModal(false);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <>
      <div className="flex flex-col tablet:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        {/* Product Image */}
        <Link
          href={`/products/${item.id}`}
          className="relative w-full tablet:w-32 h-32 flex-shrink-0"
        >
          <Image
            src={item.featuredImage}
            alt={item.name}
            fill
            className="object-cover rounded-md"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <Link href={`/products/${item.id}`} className="hover:text-blue-500">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
            <p className="text-base font-medium text-gray-700">
              {convertPrice(item.price).formatted} each
            </p>
          </div>

          {/* Quantity Controls & Remove Button - Mobile */}
          <div className="flex items-center justify-between tablet:hidden mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                disabled={item.quantity === 1}
                className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                −
              </button>
              <span className="text-lg font-semibold w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg font-bold hover:bg-blue-600"
              >
                +
              </button>
            </div>
            <button
              onClick={handleRemoveClick}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Quantity Controls - Desktop */}
        <div className="hidden tablet:flex flex-col items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.quantity === 1}
              className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              −
            </button>
            <span className="text-lg font-semibold w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg font-bold hover:bg-blue-600"
            >
              +
            </button>
          </div>
          <button
            onClick={handleRemoveClick}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>

        {/* Item Total - Desktop */}
        <div className="hidden tablet:flex flex-col items-end justify-between">
          <p className="text-xl font-bold text-gray-800">
            {convertPrice(itemTotal).formatted}
          </p>
        </div>

        {/* Item Total - Mobile */}
        <div className="tablet:hidden flex justify-end mt-2">
          <p className="text-xl font-bold text-gray-800">
            {convertPrice(itemTotal).formatted}
          </p>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <RemoveItemModal
          item={item}
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  );
};

export default CartItemCard;
