import { FC } from 'react';
import { CartItem } from '@/types/cart';

type RemoveItemModalProps = {
  item: CartItem;
  onConfirm: () => void;
  onCancel: () => void;
};

const RemoveItemModal: FC<RemoveItemModalProps> = ({
  item,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Remove Item</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove <strong>{item.name}</strong> from your
          cart?
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItemModal;
