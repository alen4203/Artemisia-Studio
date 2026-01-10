import { FC, useState } from 'react';
import { Coupon } from '@/types/coupon';

type CouponInputProps = {
  appliedCoupon: Coupon | null;
  onApply: (code: string) => { success: boolean; message: string };
  onRemove: () => void;
};

const CouponInput: FC<CouponInputProps> = ({
  appliedCoupon,
  onApply,
  onRemove,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(
    null
  );

  const handleApply = () => {
    if (!couponCode.trim()) {
      setMessage('Please enter a coupon code');
      setMessageType('error');
      return;
    }

    const result = onApply(couponCode.trim());

    if (result.success) {
      setMessage(result.message);
      setMessageType('success');
      setCouponCode('');
    } else {
      setMessage(result.message);
      setMessageType('error');
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType(null);
    }, 5000);
  };

  const handleRemove = () => {
    onRemove();
    setMessage('');
    setMessageType(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">Coupon Code</label>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-300 rounded-md">
          <div className="flex-grow">
            <p className="text-sm font-semibold text-green-700">
              {appliedCoupon.code}
            </p>
            <p className="text-xs text-green-600">{appliedCoupon.description}</p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Enter code"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
            >
              Apply
            </button>
          </div>

          {message && (
            <p
              className={`mt-2 text-sm ${
                messageType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CouponInput;
